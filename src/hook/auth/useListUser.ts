import { getListUser } from "@/services/rest/auth";
import { useQuery } from "@tanstack/react-query";

export function useListUser() {
  const { data } = useQuery({
    queryKey: ["USER_LIST"],
    queryFn: () => getListUser(),
    enabled: true,
  });
  return { listUser: data };
}
