export type ProblemStatus = "draft" | "published";
export type ProblemDifficulty = "EASY" | "MEDIUM" | "HARD";

export type ProblemDetail = {
  title: string;
  slug: string;
  statement: string; // markdown or html
  difficultyLevel: ProblemDifficulty;
  timeLimit: number; // ms
  memoryLimit: number; // MB
  visibility: boolean;
  creator_id: string;
  status: ProblemStatus;
  created_at: string; // ISO string
  updated_at: string; // ISO string
  problemId: string;
  active: boolean;
  description: string;
};
