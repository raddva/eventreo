import orderServices from "@/services/order.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useRemoveTransactionModal = () => {
  const removeTransaction = async (id: string) => {
    const res = await orderServices.deleteOrder(id);
    return res;
  };

  const {
    mutate: mutateRemoveTransaction,
    isPending: isPendingMutateRemoveTransaction,
    isSuccess: isSuccessMutateRemoveTransaction,
  } = useMutation({
    mutationFn: removeTransaction,
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
        description: "Success deleted transaction",
        color: "success",
        timeout: 3000,
      });
    },
  });

  return {
    mutateRemoveTransaction,
    isPendingMutateRemoveTransaction,
    isSuccessMutateRemoveTransaction,
  };
};

export default useRemoveTransactionModal;
