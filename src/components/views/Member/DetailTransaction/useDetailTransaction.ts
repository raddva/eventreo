import eventServices from "@/services/event.service";
import orderServices from "@/services/order.service";
import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailTransaction = () => {
  const router = useRouter();
  const getOrderById = async () => {
    const { data } = await orderServices.getOrderById(`${router.query.id}`);
    return data.data;
  };

  const { data: orderData } = useQuery({
    queryKey: ["DetailEventById"],
    queryFn: getOrderById,
    enabled: router.isReady,
  });

  const getEventById = async () => {
    const { data } = await eventServices.getEventById(`${orderData?.events}`);
    return data.data;
  };

  const { data: eventData } = useQuery({
    queryKey: ["EventById"],
    queryFn: getEventById,
    enabled: !!orderData?.events,
  });

  const getTicketById = async () => {
    const { data } = await ticketServices.getTicketById(`${orderData?.ticket}`);
    return data.data;
  };

  const { data: ticketData } = useQuery({
    queryKey: ["TicketByEvent"],
    queryFn: getTicketById,
    enabled: !!orderData?.ticket,
  });

  return {
    eventData,
    orderData,
    ticketData,
  };
};

export default useDetailTransaction;
