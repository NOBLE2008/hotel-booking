import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import CreateEditCabinForm from "./CreateEditCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { BsTrashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import useCreateCabin from "./useCreateCabin";
import EditCabin from "./EditCabin";
import DeleteCabin from "./DeleteCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { isDeleting, mutate } = useDeleteCabin();

  const { createMutate, isCreating } = useCreateCabin(
    "Cabin duplicated sucessfully",
    "Failed to duplicate cabin"
  );
  const { name, id, image, price, maxCapacity, regularPrice, discount } = cabin;
  if (isDeleting || isCreating) return <Spinner />;
  return (
    <>
      <Table.Row role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount === 0 ? (
          <span>&mdash;</span>
        ) : (
          <Discount>{formatCurrency(discount)}</Discount>
        )}

        <ButtonContainer>
          <DeleteCabin id={id} name={name} />
          <EditCabin>
            <CreateEditCabinForm initCabin={cabin} />
          </EditCabin>
          <button
            onClick={() => {
              const data = { ...cabin };
              delete data["id"];
              createMutate({ newCabin: { ...data } });
            }}
          >
            <FaCopy />
          </button>
        </ButtonContainer>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button>

            </Menus.Button>
            <Menus.Button>

            </Menus.Button>
            <Menus.Button>
              
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </Table.Row>
    </>
  );
}
