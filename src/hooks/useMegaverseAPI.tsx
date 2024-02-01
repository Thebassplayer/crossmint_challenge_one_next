// Import types from types.ts
import { PolyanetPosition, BatchRequests } from "../types/types"; // Replace with the actual path to your types file

import { useState } from "react";

const API_URL = process.env.LOCAL_API_BASE_URL;

type APIRequest<T> = {
  method: string;
  headers: Record<string, string>;
  body: string;
};

type APIResponse<T> = {
  data: T;
  status: number;
  error?: unknown;
};

export function useMegaverseAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const [data, setData] = useState<any | null>(null);

  async function makeRequest<T>(
    requestData: T,
    method: string
  ): Promise<APIResponse<T>> {
    try {
      const request: APIRequest<T> = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      };

      const response = await fetch(
        `http://localhost:3000/api/polyanets`,
        request
      );
      const data = await response.json();

      return { data, status: response.status };
    } catch (error) {
      console.error(error);
      return { status: 500, error, data: null as T };
    }
  }

  async function fetchData<T>(method: string, requestData: T): Promise<void> {
    setLoading(true);

    try {
      const result = await makeRequest(requestData, method);
      setData(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const performBatchAction = async (requests: BatchRequests) => {
    console.log(requests);
    for (const objectType in requests) {
      if (requests.hasOwnProperty(objectType)) {
        const objects = requests[objectType as keyof BatchRequests];

        if (objects) {
          const method = "POST";
          await Promise.all(
            objects.map(
              async requestData => await makeRequest(requestData, method)
            )
          );
        }
      }
    }
  };

  const postData = async (requestData: PolyanetPosition) =>
    await fetchData("POST", requestData);
  const deleteData = async (requestData: PolyanetPosition) =>
    await fetchData("DELETE", requestData);

  return {
    loading,
    error,
    data,
    postData,
    deleteData,
    performBatchAction,
  };
}
