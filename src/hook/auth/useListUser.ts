import { getListUser } from "@/services/rest/auth";
import { useQuery } from "@tanstack/react-query";

export function useListUser() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["USER_LIST"],
    queryFn: async () => {
      const result = await getListUser();
      console.log("useListUser - result:", result);
      return result;
    },
    enabled: true,
  });
  return { listUser: data, isLoading, isError, error };
}
