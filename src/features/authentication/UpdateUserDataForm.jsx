import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import SpinnerMini from "../../ui/SpinnerMini";
import Row from "../../ui/Row";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: {
        firstName: currentFirstName,
        lastName: currentLastName,
        avatar: currentAvatar,
      },
    },
  } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: currentFirstName,
      lastName: currentLastName,
      avatar: currentAvatar,
    },
  });

  const { isLoading: isUpdatingUser, updateUser } = useUpdateUser();

  function onSubmit(data) {
    // Your form submission logic goes here
    // You can use the data object to update the user's data
    updateUser({ data });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="First name">
        <Input
          type="text"
          id="firstName"
          disabled={isUpdatingUser}
          {...register("firstName", {
            required: "First name is required",
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "First name should only contain alphabetic characters",
            },
          })}
        />
      </FormRow>
      <FormRow label="Last name">
        <Input
          type="text"
          id="lastName"
          disabled={isUpdatingUser}
          {...register("lastName", {
            required: "Last name is required",
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Last name should only contain alphabetic characters",
            },
          })}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdatingUser}
          {...register("avatar")}
          type="file"
        />
      </FormRow>
      <Row type={"vertical"}>
        <Button type="reset" variation="secondary" disabled={isUpdatingUser}>
          Cancel
        </Button>
        <Button disabled={isUpdatingUser}>
          {isUpdatingUser ? <SpinnerMini /> : "Update account"}
        </Button>
      </Row>
    </Form>
  );
}

export default UpdateUserDataForm;
