import axios from "axios";
import { ProblemDetail } from "./type";

export async function getProblemDetail(id: string): Promise<ProblemDetail> {
  const res = await axios.post(
    `${window.location.origin}/api/problem/problem-detail`,
    { id }
  );
  return res.data;
}
