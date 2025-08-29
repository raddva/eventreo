import bannerServices from "@/services/banner.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useRemoveBannerModal = () => {
  const removeBanner = async (id: string) => {
    const res = await bannerServices.removeBanner(id);
    return res;
  };

  const {
    mutate: mutateRemoveBanner,
    isPending: isPendingMutateRemoveBanner,
    isSuccess: isSuccessMutateRemoveBanner,
  } = useMutation({
    mutationFn: removeBanner,
    onError: (err) => {
      addToast({
        title: "Failed",
        description: err.message,
        color: "danger",
        timeout: 3000,
      });
    },
    onSuccess: () => {
      addToast({
        title: "Success!",
        description: "Success deleted banner",
        color: "success",
        timeout: 3000,
      });
    },
  });

  return {
    mutateRemoveBanner,
    isPendingMutateRemoveBanner,
    isSuccessMutateRemoveBanner,
  };
};

export default useRemoveBannerModal;
