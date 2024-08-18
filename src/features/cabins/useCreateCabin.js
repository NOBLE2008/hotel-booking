import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export default function useCreateCabin() {
    const queryClient = useQueryClient();
  const { mutate: createMutate, isLoading: isCreating } = useMutation({
    mutationFn: ({newCabin, id}) => createCabin(newCabin, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create cabin");
    },
  });
  return {createMutate, isCreating}
}
