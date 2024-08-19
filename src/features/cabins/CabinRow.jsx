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

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  const [isEdit, setisEdit] = useState(false);

  const { isDeleting, mutate } = useDeleteCabin();
  const handleDeleteCabin = (id) => {
    return () => {
      mutate(id);
    };
    // Delete cabin logic
  };

  const { createMutate, isCreating } = useCreateCabin(
    "Cabin duplicated sucessfully",
    "Failed to duplicate cabin"
  );
  const { name, id, image, price, maxCapacity, regularPrice, discount } = cabin;
  if (isDeleting || isCreating) return <Spinner />;
  return (
    <>
      <TableRow role="row">
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
          <button onClick={handleDeleteCabin(id)}>
            <BsTrashFill />
          </button>
          <button
            onClick={() => {
              setisEdit((cur) => {
                return !cur;
              });
            }}
          >
            <MdEdit />
          </button>
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
      </TableRow>
      {isEdit && (
        <CreateEditCabinForm initCabin={cabin} setIsEdit={setisEdit} />
      )}
    </>
  );
}
