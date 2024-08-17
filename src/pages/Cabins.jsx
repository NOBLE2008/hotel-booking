import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / sort</p>
      </Row>
      <Row type={"horizontal"}>
        <CabinTable />
      </Row>
      <Row type="vertical">
        <Button onClick={() => {
          setIsFormOpen((cur) => {
            return !cur
          });
        }} type="full">{isFormOpen ? "Cancel" : "Create new cabin"}</Button>
      </Row>
      {isFormOpen && (
        <Row type="vertical">
          <CreateCabinForm />
        </Row>
      )}
    </>
  );
}

export default Cabins;
