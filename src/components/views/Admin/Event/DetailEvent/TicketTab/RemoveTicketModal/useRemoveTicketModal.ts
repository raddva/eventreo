import ticketServices from "@/services/ticket.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useRemoveTicketModal = () => {
  const removeTicket = async (id: string) => {
    const res = await ticketServices.removeTicket(id);
    return res;
  };

  const {
    mutate: mutateRemoveTicket,
    isPending: isPendingMutateRemoveTicket,
    isSuccess: isSuccessMutateRemoveTicket,
  } = useMutation({
    mutationFn: removeTicket,
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
        description: "Success deleted ticket",
        color: "success",
        timeout: 3000,
      });
    },
  });

  return {
    mutateRemoveTicket,
    isPendingMutateRemoveTicket,
    isSuccessMutateRemoveTicket,
  };
};

export default useRemoveTicketModal;
