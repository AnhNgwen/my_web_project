import axios from "axios";
import { ProblemResponse } from "../get-active-problem/type";

export async function getListProblem(): Promise<ProblemResponse> {
  const res = await axios.get(
    `${window.location.origin}/api/problem/get-my-problem`
  );
  if (!res.data.content) return {} as ProblemResponse;

  return {...res.data, content: res.data.content.map((item: ProblemResponse) => ({
    ...item,
    maxScore: 100,
  }))};
}
