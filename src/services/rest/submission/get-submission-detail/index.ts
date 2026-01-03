import axios from "axios";
import { Submission } from "../type";

export async function getSubmissionDetail(id: string): Promise<Submission> {
  const res = await axios.post(
    `${window.location.origin}/api/get-list`,{
      link: `http://localhost:8080/submissions/${id}`
    }
  );
  return res.data || null;
}