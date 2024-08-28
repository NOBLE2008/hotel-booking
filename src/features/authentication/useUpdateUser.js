import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
1;

export function useUpdateUser() {
  const queryClient = useQueryClient()
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: ({ data }) => updateUserApi(data),
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      })
    },
    onError: (error) => toast.error(error.message),
  });
  return { updateUser, isLoading };
}
