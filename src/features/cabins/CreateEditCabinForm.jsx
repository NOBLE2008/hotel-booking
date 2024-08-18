import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";

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

function CreateEditCabinForm({ initCabin = {}, setIsEdit }) {
  const { id: editId, ...editCabin } = initCabin;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editCabin : {},
  });
  const { errors, isSubmitting } = formState;
  const queryClient = useQueryClient();
  const { mutate: createMutate, isLoading: isCreating } = useMutation({
    mutationFn: ({newCabin, id}) => createCabin(newCabin, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin created successfully");
      reset();
    },
    onError: (error) => {
      toast.error("Failed to create cabin");
    },
  });

  const { mutate: editMutate, isLoading: isEditing } = useMutation({
    mutationFn: ({newCabin, id}) => createCabin(newCabin, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin edited successfully");
      reset();
      setIsEdit(false)
    },
    onError: (error) => {
      toast.error("Failed to create cabin");
    },
  });

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if(isEditSession){
      editMutate({ newCabin: { ...data, image: image }, id: editId });
    }else{
      createMutate({ newCabin: { ...data, image: image }, id: editId });
    }
    
  };

  if (isCreating || isEditing) {
    return <Spinner />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Cabin name is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount Price" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value, formValues) =>
              Number(value) < Number(formValues?.regularPrice) ||
              "Discount price must not be greater than the original price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Image" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This image is required",
          })}
          type="file"
        />
      </FormRow>

      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>{"Edit cabin"}</Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateEditCabinForm;
