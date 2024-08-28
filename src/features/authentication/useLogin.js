import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      toast.success("Login successful!");
     queryClient.setQueryData(["user"], data?.user);
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error("Failed to login. Please check your credentials.");
    },
  });
  return { login, isLoading };
}
