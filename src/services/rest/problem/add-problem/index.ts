import axios from "axios";

export async function addProblem(payload: CreateProblem) {
  const res = await axios.post(
    `${window.location.origin}/api/problem/add-problem`,
    payload
  );
  return res.data;
}
