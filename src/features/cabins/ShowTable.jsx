import React from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateEditCabinForm from "./CreateEditCabinForm";
import CabinTable from "./CabinTable";

export default function ShowTable() {
  return (
    <Modal>
      <Modal.Open open={"show-table"}>
        <Button>Show Table</Button>
      </Modal.Open>
      <Modal.Window name={"show-table"}>
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}
