import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import useCabin from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { data: bookings, isLoadingBookings, last } = useRecentBookings();
  const {
    data: stays,
    isLoading: isLoadingStays,
    confirmedStays,
  } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabin();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins) {
    return <Spinner />;
  }
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings || []}
        confirmedStays={confirmedStays || []}
        numDays={last}
        numCabins={cabins.length}
      />

      <Today />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={last} />
    </StyledDashboardLayout>
  );
}
