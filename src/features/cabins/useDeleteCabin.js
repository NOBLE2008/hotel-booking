import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { deleteCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export default function useDeleteCabin() {
  const queryClient = useQueryClient();
  const {
    isLoading: isDeleting,
    mutate,
  } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin has sucessfully been deleted");
    },
    onError: (error) => toast.error("Error deleting Cabin"),
    // refetchInterval: 5000, // refetch after 5 seconds
  });

  return {isDeleting, mutate}
}
