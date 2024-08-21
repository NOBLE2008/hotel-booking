import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import ShowTable from "../features/cabins/ShowTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations/>
      </Row>
      <Row type="horizontal">
        <CabinTable />
      </Row>
      <Row type="vertical">
        <AddCabin />
        <ShowTable />
      </Row>
    </>
  );
}

export default Cabins;
