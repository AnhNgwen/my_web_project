import { getListAdmin } from "@/services/rest/admin/getListAdmin";
import { FilterOptions } from "@/services/rest/constant";
import { useQuery } from "@tanstack/react-query";

export function useListAdmin(filter: FilterOptions) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ADMIN_LIST", filter?.pageNumber, filter?.pageSize],
    queryFn: async () => {
      const result = await getListAdmin(filter);
      return result;
    },
    enabled: true,
  });
  return { data, isLoading, isError, error };
}
