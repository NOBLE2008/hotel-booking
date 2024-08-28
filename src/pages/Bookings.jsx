import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import { useBookings } from "../features/bookings/useBookings";
import Heading from "../ui/Heading";
import Pagenation from "../ui/Pagination";
import Row from "../ui/Row"  ;
import Spinner from "../ui/Spinner";


function Bookings() {
  const { count, isLoading } = useBookings();

    if (isLoading) {
        return <Spinner />;
    }
    return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <BookingTable />
      <Pagenation count={count} />
    </>
  );
}

export default Bookings;
