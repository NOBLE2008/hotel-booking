import React from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import styled from "styled-components";
import { MdEdit } from "react-icons/md";
import CreateEditCabinForm from "./CreateEditCabinForm";

const ButtonDiv = styled.div`
  width: 100%;
`;

export default function EditCabin({ children, initCabin }) {
  return (
    <Modal>
      <Modal.Open open={"edit-cabin"}>
        <ButtonDiv>{children}</ButtonDiv>
      </Modal.Open>
      <Modal.Window name={"edit-cabin"}>
        <CreateEditCabinForm initCabin={initCabin} />
      </Modal.Window>
    </Modal>
  );
}
