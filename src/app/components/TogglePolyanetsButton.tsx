"use client";
import { useMegaverseAPI } from "@/hooks/useMegaverseAPI";
import React, { useState } from "react";

const TogglePolyanetsComponent = () => {
  const { loading, error, data, performBatchAction, postData } =
    useMegaverseAPI();
  const [isCreating, setIsCreating] = useState(false);

  const createPolyanet = async () => {
    setIsCreating(true);

    const createPolyanetRequests = {
      row: "2",
      column: "2", // Adjust the column as needed
    };
    console.log(createPolyanetRequests);

    await postData(createPolyanetRequests);

    setIsCreating(false);
  };

  const createPolyanets = async () => {
    setIsCreating(true);

    const createPolyanetRequests = Array.from({ length: 10 }, (_, index) => ({
      row: (index + 1).toString(),
      column: "3", // Adjust the column as needed
    }));
    console.log(createPolyanetRequests);

    await performBatchAction({ polyanets: createPolyanetRequests });

    setIsCreating(false);
  };

  return (
    <>
      <div className="border border-white h-10 w-10">
        <button onClick={createPolyanet} disabled={isCreating}>
          {isCreating ? "Creating..." : "🪐"}
        </button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && <p>Created Polyanets: {JSON.stringify(data)}</p>}
      </div>
    </>
  );
};

export default TogglePolyanetsComponent;
