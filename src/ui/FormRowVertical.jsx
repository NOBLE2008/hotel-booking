import React from "react";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.div`
  color: var(--color-red-700);
  background-color: var(--color-red-200);
`;

export default function FormRowVertical({ label, children, error }) {
  return (
    <StyledFormRow>
      <Label htmlFor={children.props.id}>{label}</Label>
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
