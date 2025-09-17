import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailEvent = () => {
  const { query, isReady } = useRouter();

  const getDetailEventBySlug = async () => {
    const { data } = await eventServices.getEventBySlug(`${query.slug}`);
    return data.data;
  };

  const { data: eventData, isLoading: isLoadingEvent } = useQuery({
    queryKey: ["DetailEventBySlug"],
    queryFn: getDetailEventBySlug,
    enabled: isReady,
  });

  const getTickets = async () => {
    const { data } = await ticketServices.getTicketsByEventId(
      `${eventData._id}`,
    );
    return data.data;
  };

  const { data: dataTickets, isLoading: isLoadingTickets } = useQuery({
    queryKey: ["Tickets"],
    queryFn: getTickets,
    enabled: !!eventData?._id,
  });

  return {
    eventData,
    isLoadingEvent,
    dataTickets,
    isLoadingTickets,
  };
};

export default useDetailEvent;
