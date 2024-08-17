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



const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const {errors} = formState;
  const {name, maxCapacity, regularPrice, discount, description} = errors
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: createCabin,
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

  const onSubmit = (data) => {
    mutate(data);
  };

  const onError = (error) => {
    console.log(error)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Cabin name is required",
          })}
        />
        
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => value < getValues().regularPrice || 'Discount price must be greater than the original price'
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
