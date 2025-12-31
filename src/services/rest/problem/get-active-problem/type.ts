export interface Problem {
  problemId: number;
  problemCode: string;
  title: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  difficultyLevel: string;
  timeLimit: number;
  memoryLimit: number;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
  active: boolean;
  maxScore: number;
}

export interface ProblemResponse {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  content: Problem[];
}
