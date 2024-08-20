import React from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateEditCabinForm from "./CreateEditCabinForm";

export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open open={'create-cabin'}>
        <Button>Create Cabin</Button>
      </Modal.Open>
      <Modal.Window name={'create-cabin'}>
        <CreateEditCabinForm />
      </Modal.Window>
    </Modal>
  );
}
