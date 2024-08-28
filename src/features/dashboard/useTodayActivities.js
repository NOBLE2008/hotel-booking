import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivities() {
  const {data: todayActivities, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activties"],
  });
  return {todayActivities, isLoading};
}
