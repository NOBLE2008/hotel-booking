import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import { useEffect } from "react";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import useCabin from "./useCabin";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  width: 100%;
  margin-top: 2rem;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

export default function CabinTable() {
  
  const {isLoading, cabins} = useCabin()

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Table role="table">
      <TableHeader role="row">
        <p></p>
        <p>CABIN</p>
        <p>CAPACITY</p>
        <p>PRICE</p>
        <p>View</p>
        <p>Book</p>
      </TableHeader>
      {
        /* Add cabin data here */ cabins.map((cabin) => {
          return <CabinRow cabin={cabin} key={cabin.id}/>;
        })
      }
    </Table>
  );
}
