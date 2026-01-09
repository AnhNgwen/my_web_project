import axios from "axios";
import { BASE_URL } from "../../constant";
import { TestCaseResult } from "./type";

export async function getListTestCaseResult(
  submissionId: string
): Promise<TestCaseResult[]> {
  const res = await axios.post("/api/get-list", {
    link: `${BASE_URL}/result/submission/${submissionId}`,
  });
  return res.data || null;
}
