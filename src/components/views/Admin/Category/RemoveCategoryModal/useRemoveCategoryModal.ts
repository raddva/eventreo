import categoryServices from "@/services/category.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useRemoveCategoryModal = () => {
  const removeCategory = async (id: string) => {
    const res = await categoryServices.removeCategory(id);
    return res;
  };

  const {
    mutate: mutateRemoveCategory,
    isPending: isPendingMutateRemoveCategory,
    isSuccess: isSuccessMutateRemoveCategory,
  } = useMutation({
    mutationFn: removeCategory,
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
        description: "Success deleted category",
        color: "success",
        timeout: 3000,
      });
    },
  });

  return {
    mutateRemoveCategory,
    isPendingMutateRemoveCategory,
    isSuccessMutateRemoveCategory,
  };
};

export default useRemoveCategoryModal;
