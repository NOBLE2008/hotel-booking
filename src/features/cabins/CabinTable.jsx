import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import { useEffect } from "react";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import useCabin from "./useCabin";
import Table from "../../ui/Table";

export default function CabinTable() {
  const { isLoading, cabins } = useCabin();
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
      <Table.Header role="row">
        <p></p>
        <p>CABIN</p>
        <p>CAPACITY</p>
        <p>PRICE</p>
        <p>View</p>
        <p>Book</p>
      </Table.Header>
      <Table.Body
        data={cabins}
        render={(cabin) => {
          return <CabinRow cabin={cabin} key={cabin.id} />;
        }}
      />
    </Table>
  );
}
