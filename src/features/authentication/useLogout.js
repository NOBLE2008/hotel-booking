import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      // Redirect to the login page after successful logout
      queryClient.removeQueries();
      navigate("/login", { replace: true });
      toast.success("Logout Successful");
    },
    onError: (error) => toast.error("Failed to logout"),
  });
  return { logout, isLoading };
}
