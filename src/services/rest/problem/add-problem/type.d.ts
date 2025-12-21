type CreateProblem = {
  problemCode: string;
  title: string;
  description: string;
  constraints: string;
  difficultyLevel: string;
  inputFormat: string | null;
  outputFormat: string | null;
  timeLimit: number; // milliseconds
  memoryLimit: number; // MB
};
