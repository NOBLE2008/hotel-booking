import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export default function useCreateCabin(toastSuccess, toastError) {
    const queryClient = useQueryClient();
  const { mutate: createMutate, isLoading: isCreating } = useMutation({
    mutationFn: ({newCabin, id}) => {
        console.log(newCabin)
        return createCabin(newCabin, id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success(toastSuccess);
    },
    onError: (error) => {
      toast.error(toastError);
    },
  });
  return {createMutate, isCreating}
}
