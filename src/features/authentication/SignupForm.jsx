import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;
  const { isLoading, signup } = useSignup();

  const onSubmit = ({ firstName, lastName, email, password }) => {
    // Your form submission logic goes here
    signup({ firstName, lastName, email, password });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="First name" error={errors?.firstName?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="firstName"
          {...register("firstName", {
            required: "First name is required",
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "First name should only contain alphabetic characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Last name" error={errors?.lastName?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="lastName"
          {...register("lastName", {
            required: "Last name is required",
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Last name should only contain alphabetic characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isLoading}
          type="email"
          id="email"
          {...register("email", {
            required: "Email address is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isLoading}
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isLoading}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Repeat password is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
            message: "Passwords do not match",
          })}
        />
      </FormRow>

      <FormRow label="">
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>{isLoading ? <SpinnerMini /> : "Create new user"}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
