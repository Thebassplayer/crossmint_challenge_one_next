const API_URL = process.env.CROSSMINT_API_BASE_URL;
const CANDIDATE_ID = process.env.CANDIDATE_ID;

type PolyanetRequest = {
  method: string;
  headers: Record<string, string>;
  body: string;
};

export async function processPolyanetRequest(
  requestData: any,
  method: string
): Promise<{ data?: any; status: number; error?: unknown }> {
  console.log("processPolyanetRequest", requestData, method);
  try {
    const request: PolyanetRequest = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };

    const response = await fetch(`${API_URL}/polyanets`, request);
    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    console.error(error);
    return { error, status: 500 };
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { row, column } = body;

    const requestData = {
      candidateId: CANDIDATE_ID,
      row,
      column,
    };

    const result = await processPolyanetRequest(requestData, "POST");

    return new Response(JSON.stringify(result.data), {
      status: result.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { row, column } = body;

    const requestData = {
      candidateId: CANDIDATE_ID,
      row,
      column,
    };

    const result = await processPolyanetRequest(requestData, "DELETE");

    return new Response(JSON.stringify(result.data), {
      status: result.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
