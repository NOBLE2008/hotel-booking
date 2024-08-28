import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getCabins } from "../../services/apiCabins";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status");
  const page = Number(searchParams.get("page") || 1);
  const filter = {
    field: "status",
    value: status,
  };
  const { isLoading, data } = useQuery({
    queryKey: ["bookings", filter, page],
    queryFn: () => getBookings(filter, page),
  });

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, page - 1],
      queryFn: () => getBookings(filter, page - 1),
    });
  }

  console.log(page, Math.ceil(data?.count / 10));
  if (Number(page) !== Math.ceil(data?.count / 10) && !isLoading) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, page + 1],
      queryFn: () => getBookings(filter, page + 1),
    });
  }
  const bookings = data?.data;
  const count = data?.count;
  return { isLoading, bookings, count };
}
