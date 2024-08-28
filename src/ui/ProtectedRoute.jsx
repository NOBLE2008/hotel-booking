import React, { useEffect } from "react";
import {useUser} from "../features/authentication/useUser";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function ProtectedRoute({ children }) {
  // Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(function () {
    if (!isAuthenticated && !isLoading) {
       return navigate("/login");
    }
  }, [ navigate, isLoading, isAuthenticated]);
  //While Loading, show a spinner
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // If user is not authenticated, redirect to login page

  // If user is authenticated, render the children
  return <>{children}</>;
}
