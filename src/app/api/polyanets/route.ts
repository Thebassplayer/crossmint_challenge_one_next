/**Megaverse API docs
The Megaverse service allows you to generate different astral objects: Polyanets, Soloons and Comeths!

The megaverse service is a REST API. All API routes below refer to a single route: https://challenge.crossmint.io/api/...

IMPORTANT: All APIs take a required parameter 'candidateId'
Polyanets
POST /api/polyanets with arguments 'row' and 'column' for their position in the map
DELETE /api/polyanets with arguments 'row' and 'column' will delete a Polyanet if you made a mistake */

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);
  return new Response("ok");
}
