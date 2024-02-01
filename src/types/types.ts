// Types for Polyanets
type PolyanetPosition = {
  row: string;
  column: string;
};

type CreatePolyanetRequest = PolyanetPosition;
type DeletePolyanetRequest = PolyanetPosition;

// Types for Soloons
type SoloonPosition = PolyanetPosition;
type SoloonColor = "blue" | "red" | "purple" | "white";

type CreateSoloonRequest = SoloonPosition & { color: SoloonColor };
type DeleteSoloonRequest = SoloonPosition;

// Types for Comeths
type ComethPosition = PolyanetPosition;
type ComethDirection = "up" | "down" | "right" | "left";

type CreateComethRequest = ComethPosition & { direction: ComethDirection };
type DeleteComethRequest = ComethPosition;

// Type for Goal Map
type GoalMapRequest = {
  candidateId: string;
};

// Type for Batch Requests
type BatchRequests = {
  polyanets?: CreatePolyanetRequest[] | DeletePolyanetRequest[];
  soloons?: CreateSoloonRequest[] | DeleteSoloonRequest[];
  comeths?: CreateComethRequest[] | DeleteComethRequest[];
};

// Type for Goal Map Response
type GoalMapResponse = {
  // Define the structure of the goal map response here
  // ...
};

export type {
  PolyanetPosition,
  CreatePolyanetRequest,
  DeletePolyanetRequest,
  SoloonPosition,
  SoloonColor,
  CreateSoloonRequest,
  DeleteSoloonRequest,
  ComethPosition,
  ComethDirection,
  CreateComethRequest,
  DeleteComethRequest,
  GoalMapRequest,
  BatchRequests,
  GoalMapResponse,
};
