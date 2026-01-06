import axios from "axios";
import { FilterOptions } from "../../constant";
import { ListSubmissionResponse } from "./type";

export async function getListSubmission(filter: FilterOptions, problemId: string): Promise<ListSubmissionResponse> {
  const res = await axios.post(
    '/api/get-list', {
      link: `https://dinhchat.id.vn/submissions/user/problem/${problemId}?page=${filter.pageNumber}&pageSize=${filter.pageSize}`,
      filter
    }
  );
  return res.data || null;
}
