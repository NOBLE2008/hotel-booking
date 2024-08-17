import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.p`
  padding: 0.375rem;
  color: #dc2626;
  background-color: #fee2e2;
  font-size: 0.75rem;
  line-height: 1rem;
  border-radius: 0.5rem;
`;

export default function FormRow({ label = "Form Label", children, error }) {
  return (
    <StyledFormRow>
      <Label htmlFor={children?.props?.id}>{label}</Label>
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
