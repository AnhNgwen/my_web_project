import { getListProblem } from "@/services/rest/problem/get-my-problems";
import { useQuery } from "@tanstack/react-query";

export function useListProblem() {
  const { data } = useQuery({
    queryKey: ["LIST_PROBLEM"],
    queryFn: () => getListProblem(),
  });
  return { listProblem: data };
}
