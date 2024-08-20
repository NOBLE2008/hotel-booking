import React from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import styled from "styled-components";
import { MdEdit } from "react-icons/md";
import { BsTrashFill } from "react-icons/bs";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteCabin from "./useDeleteCabin";

const UnStyledButton = styled.button``;

export default function DeleteCabin({ id, name }) {
    const {isDeleting, mutate} = useDeleteCabin()
    const onDelete = () => {
        mutate(id)
    }
  return (
    <Modal>
      <Modal.Open open={"delete-cabin"}>
        <UnStyledButton>
          <BsTrashFill />
        </UnStyledButton>
      </Modal.Open>
      <Modal.Window name={"delete-cabin"}><ConfirmDelete disabled={isDeleting} onConfirm={onDelete} resourceName={`Cabin: ${name}`}/></Modal.Window>
    </Modal>
  );
}
