import { BreadcrumbItem, Breadcrumbs, Skeleton, Tab, Tabs } from "@heroui/react";
import useDetailEvent from "./useDetailEvent";
import { convertTime } from "@/utils/date";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { ITicket } from "@/types/Ticket";
import DetailEventTickets from "./DetailEventTickets";
import DetailEventCart from "./DetailEventCart";
import Script from "next/script";
import environment from "@/config/environment";

const DetailEvent = () => {
    const {
        eventData,
        dataTickets,
        cart,
        dataTicketInCart,
        handleAddToCart,
        handleChangeQuantity,
        mutateCreateOrder,
        isPendingCreateOrder
    } = useDetailEvent();

    return (
        <div className="px-8 md:px-0">
            <Script
                src={environment.MIDTRANS_SNAP_URL}
                data-client-key={environment.MIDTRANS_CLIENT_KEY}
                strategy="lazyOnload"
            />
            <Skeleton isLoaded={!!eventData?.name} className="h-4 w-1/4 rounded-lg">
                <Breadcrumbs>
                    <BreadcrumbItem href="/">Home</BreadcrumbItem>
                    <BreadcrumbItem href="/event">Event</BreadcrumbItem>
                    <BreadcrumbItem>{eventData?.name}</BreadcrumbItem>
                </Breadcrumbs>
            </Skeleton>

            <section className="mt-8 flex flex-col gap-10 lg:flex-row">
                <div className="w-full lg:w-4/6">
                    <Skeleton isLoaded={!!eventData?.name} className="h-10 rounded-lg mb-2">
                        <h1 className="mb-2 text-2xl font-semibold text-primary">
                            {eventData?.name}
                        </h1>
                    </Skeleton>
                    <Skeleton className="h-6 rounded-lg mb-2" isLoaded={!!eventData?.startDate || !!eventData?.endDate}>
                        <div className="mb-3 flex items-center gap-2 text-foreground-500">
                            <FaClock width={16} />
                            <p>
                                {convertTime(eventData?.startDate)} - {" "}
                                {convertTime(eventData?.endDate)}
                            </p>
                        </div>
                    </Skeleton>
                    <Skeleton className="h-6 rounded-lg w-1/2 mb-2" isLoaded={!!eventData?.isOnline || !!eventData?.location}>
                        <div className="flex items-center gap-2 text-foreground-500">
                            <FaLocationDot width={16} />
                            <p>
                                {eventData?.isOnline ? "Online" : "Offline"}{" "}
                                {eventData?.isOnline ? "" : ` - ${eventData?.location?.address}`}
                            </p>
                        </div>
                    </Skeleton>
                    <Skeleton className="mb-4 aspect-video w-full" isLoaded={!!eventData?.banner}>
                        <Image
                            alt="cover"
                            src={eventData?.banner}
                            className="aspect-video w-full rounded-lg object-cover"
                            width={1920}
                            height={1080}
                        />
                    </Skeleton>
                    <Tabs aria-label="Tab Detail Event" fullWidth>
                        <Tab key="Description" title="Description">
                            <h2 className="text-xl font-semibold text-foreground-700">
                                About Event
                            </h2>
                            <Skeleton isLoaded={!!eventData?.description} className="h-32 w-full rounded-lg mt-2">
                                <p className="text-foreground-500">{eventData?.description}</p>
                            </Skeleton>
                        </Tab>
                        <Tab key="Tickets" title="Tickets">
                            <h2 className="text-xl font-semibold text-foreground-700">
                                Event Tickets
                            </h2>
                            <div className="mt-2 flex flex-col gap-8">
                                {dataTickets?.map((ticket: ITicket) =>
                                    <DetailEventTickets
                                        key={`ticket-${ticket._id}`}
                                        ticket={ticket}
                                        cart={cart}
                                        handleAddToCart={() => handleAddToCart(`${ticket._id}`)}
                                    />
                                )}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
                <div className="w-full lg:w-2/6">
                    <DetailEventCart
                        cart={cart}
                        dataTicketInCart={dataTicketInCart}
                        onChangeQuantity={handleChangeQuantity}
                        onCreateOrder={mutateCreateOrder}
                        isLoading={isPendingCreateOrder}
                    />
                </div>
            </section >
        </div >
    )
}

export default DetailEvent;