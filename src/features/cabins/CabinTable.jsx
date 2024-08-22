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

  const sortValue = JSON.parse(searchParams.get("sort") || "{}");
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
  if (sortValue["name"] === 1) {
    filteredCabins.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }
  if (sortValue["name"] === -1) {
    filteredCabins.sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
  }
  if (sortValue["regularPrice"] === -1) {
    filteredCabins.sort((a, b) => {
      return b.regularPrice - a.regularPrice;
    });
  }
  if (sortValue["regularPrice"] === 1) {
    filteredCabins.sort((a, b) => {
      return a.regularPrice - b.regularPrice;
    });
  }
  if (sortValue["maxCapacity"] === 1) {
    filteredCabins.sort((a, b) => {
      return a.maxCapacity - b.maxCapacity;
    });
  }
  if (sortValue["maxCapacity"] === -1) {
    filteredCabins.sort((a, b) => {
      return b.maxCapacity - a.maxCapacity;
    });
  }

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
