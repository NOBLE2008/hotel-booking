import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Spinner from "./Spinner";
import { useLogout } from "../features/authentication/useLogout";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function AppLayout() {
  const { isLoading: isLoggingOut } = useLogout();

  return (
    <>
      <StyledAppLayout>
        <Header />
        <Sidebar />
        <Main>
          <Outlet />
        </Main>
      </StyledAppLayout>
    </>
  );
}
