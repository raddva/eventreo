import ticketServices from "@/services/ticket.service";
import { ITicket } from "@/types/Ticket";
import { addToast } from "@heroui/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input ticket name"),
  price: yup.string().required("Please input price"),
  quantity: yup.string().required("Please input quantity"),
  description: yup.string().required("Please input ticket description"),
});

const useAddTicketModal = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addTicket = async (payload: ITicket) => {
    const res = await ticketServices.addTicket(payload);
    return res;
  };

  const {
    mutate: mutateAddTicket,
    isPending: isPendingMutateAddTicket,
    isSuccess: isSuccessMutateAddTicket,
  } = useMutation({
    mutationFn: addTicket,
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
        description: "Added new ticket",
        color: "success",
        timeout: 3000,
      });
    },
  });

  const handleAddTicket = (data: ITicket) => {
    data.events = `${router.query.id}`;
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);
    mutateAddTicket(data);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddTicket,
    isPendingMutateAddTicket,
    isSuccessMutateAddTicket,
  };
};

export default useAddTicketModal;
