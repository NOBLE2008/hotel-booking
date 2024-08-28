import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ email, password, firstName, lastName }) =>
      signUpApi({ email, password, firstName, lastName }),
    onSuccess: (data) => {
      toast.success("User created successfully. Check inbox to verify email");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // refetchInterval: 60 * 60 * 1000, // refetch every hour
  });
  return { signup, isLoading };
}
