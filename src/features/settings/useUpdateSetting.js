import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export default function useUpdateSettings() {
    const queryClient = useQueryClient()
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Setting updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update settings");
    },
  });
  return {updateSetting, isUpdating};
}
