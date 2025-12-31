import axios from "axios";
import { ProblemResponse } from "./type";

export async function getListActiveProblem(link: string): Promise<ProblemResponse> {
  const res = await axios.post("/api/get-list", {
    link,
  });

  if (!res.data.content) return {} as ProblemResponse;

  return {...res.data, content: res.data.content.map((item: ProblemResponse) => ({
    ...item,
    maxScore: 100,
  }))};
}
