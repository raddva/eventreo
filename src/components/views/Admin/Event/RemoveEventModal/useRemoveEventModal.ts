import eventServices from "@/services/event.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useRemoveEventModal = () => {
  const removeEvent = async (id: string) => {
    const res = await eventServices.removeEvent(id);
    return res;
  };

  const {
    mutate: mutateRemoveEvent,
    isPending: isPendingMutateRemoveEvent,
    isSuccess: isSuccessMutateRemoveEvent,
  } = useMutation({
    mutationFn: removeEvent,
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
        description: "Success deleted event",
        color: "success",
        timeout: 3000,
      });
    },
  });

  return {
    mutateRemoveEvent,
    isPendingMutateRemoveEvent,
    isSuccessMutateRemoveEvent,
  };
};

export default useRemoveEventModal;
