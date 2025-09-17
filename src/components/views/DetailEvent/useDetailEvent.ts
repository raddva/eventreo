import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { ICart, ITicket } from "@/types/Ticket";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { defaultCart } from "./DetailEvent.constants";

const useDetailEvent = () => {
  const { query, isReady } = useRouter();

  const getDetailEventBySlug = async () => {
    const { data } = await eventServices.getEventBySlug(`${query.slug}`);
    return data.data;
  };

  const { data: eventData } = useQuery({
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

  const { data: dataTickets } = useQuery({
    queryKey: ["Tickets"],
    queryFn: getTickets,
    enabled: !!eventData?._id,
  });

  const [cart, setCart] = useState<ICart>(defaultCart);

  const dataTicketInCart = useMemo(() => {
    if (dataTickets) {
      return dataTickets.find((ticket: ITicket) => ticket._id == cart.ticket);
    }

    return null;
  }, [dataTickets, cart]);

  const handleAddToCart = (ticket: string) => {
    setCart({
      events: eventData._id as string,
      ticket,
      quantity: 1,
    });
  };

  const handleChangeQuantity = (type: "increment" | "decrement") => {
    if (type == "increment") {
      if (cart.quantity < dataTicketInCart?.quantity) {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity + 1,
        }));
      }
    } else {
      if (cart.quantity <= 1) {
        setCart(defaultCart);
      } else {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity - 1,
        }));
      }
    }
  };

  return {
    eventData,
    dataTickets,

    cart,
    dataTicketInCart,
    handleAddToCart,
    handleChangeQuantity,
  };
};

export default useDetailEvent;
