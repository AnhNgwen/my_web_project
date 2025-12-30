import { getUserInfor } from "@/services/rest/auth";
import { useQuery } from "@tanstack/react-query";

export function useUserInfo(userName: string) {
  const { data } = useQuery({
    queryKey: ["USER_INFO"],
    queryFn: () => getUserInfor(userName),
    enabled: !!userName,
  });
  return { userInfo: data };
}
