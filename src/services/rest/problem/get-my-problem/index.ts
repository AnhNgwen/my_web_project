import axios from "axios";
import { ActiveProblem } from "./type";

export async function getListProblem(): Promise<ActiveProblem[]> {
  // const res = await axios.get(
  //   "https://686e2031c9090c49538860be.mockapi.io/activeProblem"
  // );
  const res = await axios.get("/api/problem/get-list-problem");
  return res.data || null;
}
