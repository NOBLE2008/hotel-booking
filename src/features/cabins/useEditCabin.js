import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useEditCabin() {
    const queryClient = useQueryClient()
  const { mutate: editMutate, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }) => createCabin(newCabin, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin edited successfully");
    },
    onError: (error) => {
      toast.error("Failed to create cabin");
    },
  });
  return {editMutate, isEditing};
}
