import authServices from "@/services/auth.service";
import { IProfile } from "@/types/Auth";
import { addToast } from "@heroui/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useProfile = () => {
  const { isReady } = useRouter();

  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile, refetch: refetchProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: isReady,
  });

  const updateProfile = async (payload: IProfile) => {
    const { data } = await authServices.updateProfile(payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateProfile,
    isPending: isPendingMutateUpdateProfile,
    isSuccess: isSuccessMutateUpdateProfile,
  } = useMutation({
    mutationFn: (payload: IProfile) => updateProfile(payload),
    onError: (err) => {
      addToast({
        title: "Failed",
        description: err.message,
        color: "danger",
        timeout: 3000,
      });
    },
    onSuccess: () => {
      refetchProfile();
      addToast({
        title: "Success!",
        description: "Updated profile",
        color: "success",
        timeout: 3000,
      });
    },
  });

  const handleUpdateProfile = (data: IProfile) => mutateUpdateProfile(data);

  return {
    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,
  };
};

export default useProfile;
