import { FilterOptions } from "@/services/rest/constant";
import { useState } from "react";
import { useListActiveProblem } from "./useActiveProblem";

export function useGetListActiveProblem(adminId: string) {
  const [filter, setFilter] = useState<FilterOptions>({
    pageNumber: 0,
    pageSize: 10,
  });
  const { listActiveProblem, isLoading, isError, error } =
    useListActiveProblem(filter, adminId);

  const handleFilterChange = (newFilter: FilterOptions) => {
    setFilter(newFilter);
  };

  return { listActiveProblem, isLoading, isError, error, handleFilterChange };
}
