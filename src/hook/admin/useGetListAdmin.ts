import { FilterOptions } from "@/services/rest/constant";
import { useState } from "react";
import { useListAdmin } from "./useListAdmin";

export default function useGetListAdmin() {
  const [filter, setFilter] = useState<FilterOptions>({
    pageNumber: 0,
    pageSize: 10,
  });
  const { data, isLoading, isError, error } = useListAdmin(filter);

  const handleFilterChange = (newFilter: FilterOptions) => {
    setFilter(newFilter);
  };

  return { listAdmin: data, isLoading, isError, error, handleFilterChange };
}
