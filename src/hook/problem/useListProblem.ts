import { getListProblem } from "@/services/rest/problem/get-my-problem";
import { useQuery } from "@tanstack/react-query";

export function useListProblem() {
  const { data } = useQuery({
    queryKey: ["LIST_PROBLEM"],
    queryFn: () => getListProblem(),
  });
  return { listProblem: data };
}
