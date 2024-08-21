import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import { useEffect } from "react";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import useCabin from "./useCabin";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

export default function CabinTable() {
  const { isLoading, cabins } = useCabin();
  const [searchParams] = useSearchParams();
  if (isLoading) {
    return <Spinner />;
  }

  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "discount")
    filteredCabins = cabins.filter((cabin) => {
      return cabin.discount;
    });
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => {
      return !cabin.discount;
    });
  console.log(filteredCabins);
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
        data={filteredCabins}
        render={(cabin) => {
          return <CabinRow cabin={cabin} key={cabin.id} />;
        }}
      />
    </Table>
  );
}
