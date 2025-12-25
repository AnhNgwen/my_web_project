import axios from "axios";
import { TestCase } from "./type";

export async function getListTestCaseForProblem(
  id: string
): Promise<TestCase[]> {
  console.log(id);
  const res = await axios.post(
    `${window.location.origin}/api/test-case/get-list-test-case-per-problem-id`,
    { id }
  );
  return res.data || null;
}
