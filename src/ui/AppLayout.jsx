import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const Main = styled.main`
    background-color: var(--color-grey-50);
`

const StyledAppLayout = styled.div`
    display: grid;
    grid-template-columns: 28rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
`

export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}
