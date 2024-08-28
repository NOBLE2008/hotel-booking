import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import useCabin from "../features/cabins/useCabin";
import Uploader from "../data/Uploader";

const StyledSideBar = styled.div`
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-0);
  padding: 3.2rem 0.3rem;
  gap: 3.2rem;
`;
export default function Sidebar() {
  const { cabins } = useCabin();
  return (
    <StyledSideBar>
      <Logo />
      <MainNav />
      <Uploader />
    </StyledSideBar>
  );
}
