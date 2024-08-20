import React from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import styled from "styled-components";
import { MdEdit } from "react-icons/md";

const UnStyledButton = styled.button``;

export default function EditCabin({ children }) {
  return (
    <Modal>
      <Modal.Open open={"edit-cabin"}>
        <UnStyledButton>
          <MdEdit />
        </UnStyledButton>
      </Modal.Open>
      <Modal.Window name={"edit-cabin"}>{children}</Modal.Window>
    </Modal>
  );
}
