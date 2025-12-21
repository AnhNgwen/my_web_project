import { addProblem } from "@/services/rest/problem/add-problem";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddProblem() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ payload }: { payload: CreateProblem }) => {
      const res = await addProblem(payload);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_PROBLEM"] });
    },
  });
  return {
    addProblem: mutation.mutate,
    addProblemAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
}
