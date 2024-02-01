import { processPolyanetRequest } from "../route";

const CANDIDATE_ID = process.env.CANDIDATE_ID;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const results = await Promise.all(
      body.map(async (item: any) => {
        const requestData = {
          candidateId: CANDIDATE_ID,
          row: item.data.row,
          column: item.data.column,
        };
        return processPolyanetRequest(requestData, "POST");
      })
    );

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const results = await Promise.all(
      body.map(async (item: any) => {
        const requestData = {
          candidateId: CANDIDATE_ID,
          row: item.data.row,
          column: item.data.column,
        };
        return processPolyanetRequest(requestData, "DELETE");
      })
    );

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
