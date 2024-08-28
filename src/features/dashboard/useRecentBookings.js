import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentBookings() {
  const [searchParmams, setSearcParams] = useSearchParams();
  const last = searchParmams.get("last") || 7;

  const date = subDays(new Date(), Number(last)).toISOString();
  const { data, isLoading } = useQuery({
    queryKey: ["bookings", `last-${last}`],
    queryFn: () => getBookingsAfterDate(date),
  });
  return {data, isLoading, last};
}
