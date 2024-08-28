import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export default function useRecentStays() {
  const [searchParmams, setSearcParams] = useSearchParams();
  const last = searchParmams.get("last") || 7;

  const date = subDays(new Date(), Number(last)).toISOString();
  const { data: stays, isLoading } = useQuery({
    queryKey: ["stays", `last-${last}`],
    queryFn: () => getStaysAfterDate(date),
  });

  const confirmedStays = stays?.filter((stay) => {
    return stay.status === "checked-in" || stay.status === "checked-out";
  })
  return {isLoading, stays, confirmedStays};
}
