import { registerAccount } from "@/services/rest/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRegisterAccount() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ payload }: { payload: RegisterTypes }) => {
      const res = await registerAccount(payload);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["USER_LIST"],
        exact: false,
      });
    },
  });
  return {
    registerAccount: mutation.mutate,
    registerAccountAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
}
