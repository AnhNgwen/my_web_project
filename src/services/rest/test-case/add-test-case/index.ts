import axios from "axios";
import { BASE_URL } from "../../constant";
import { CreateTestCase } from "./type";

export async function addTestCase(problemId: number, payload: CreateTestCase[]) {

  const res = await axios.post('/api/post', {
    link: `${BASE_URL}/testcases/problem/${problemId}`,
    payload,
  })

  return res.data;
}
