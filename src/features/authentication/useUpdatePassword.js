import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { updatePassword as updatePasswordApi } from "../../services/apiAuth";

export function useUpdatePassword() {
  const { mutate: updatePassword, isLoading } = useMutation({
    mutationFn: (password) =>
      updatePasswordApi(password),
    onSuccess: () => toast.success("Your password has been updated"),
    onError: (error) => toast.error(error.message)
  });
  return {updatePassword, isLoading};
}
