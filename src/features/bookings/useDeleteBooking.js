import React from "react";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();

  // Mutation hook for deleting a booking
  const { mutate: deleteBooking, isLoading } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success("Booking has been deleted successfully");
      // Refetch all bookings after deletion
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => toast.error("Failed to delete booking"),
    // refetchInterval: 60 * 1000, // Automatically refetch after 1 minute
  });
  return { deleteBooking, isLoading };
}
