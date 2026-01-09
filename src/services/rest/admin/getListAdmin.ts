import axios from "axios";
import { BASE_URL, FilterOptions } from "../constant";
import { ListAdminResponse } from "./type";

export async function getListAdmin(filter: FilterOptions): Promise<ListAdminResponse> {
  try {
    const res = await axios.post('/api/get-list',{
      link: `${BASE_URL}/user/class?page=${filter.pageNumber}&pageSize=${filter.pageSize}`,
    });
    return res.data;
  } catch (error) {
    console.error("Get user info API error:", error);
    return {} as ListAdminResponse;
  }
}
