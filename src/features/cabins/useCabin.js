import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCabins } from "../../services/apiCabins";

export default function useCabin() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return {isLoading, cabins};
}
