import CardEvent from "@/components/ui/CardEvent";
import useEvent from "./useEvent";
import { IEvent } from "@/types/Event";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import EventFooter from "./EventFooter";
import EventFilter from "./EventFilter";
import Image from "next/image";

const Event = () => {
    const router = useRouter();
    const { dataEvents, isLoadingEvents, isRefetchingEvents } = useEvent();
    const { setUrlExplore } = useChangeUrl();

    useEffect(() => {
        if (router.isReady) {
            setUrlExplore();
        }
    }, [router.isReady]);

    return (
        <div className="flex w-full justify-center gap-6 px-4 lg:flex-row lg:px-0 flex-col ">
            <EventFilter />
            <div className="min-h-[70vh] flex-1 w-full">
                <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {!isLoadingEvents && !isRefetchingEvents ?
                        dataEvents?.data?.map((event: IEvent) => (
                            <CardEvent
                                isLoading={isLoadingEvents}
                                event={event}
                                key={`card-event-${event._id}`}
                            />
                        )) :
                        Array.from({ length: 3 }).map((_, index) => (
                            <CardEvent
                                isLoading={isLoadingEvents}
                                key={`card-event-loading-${index}`}
                            />
                        ))}
                </div>

                {!isLoadingEvents && dataEvents?.data?.length > 0 && (
                    <EventFooter totalPages={dataEvents?.pagination?.totalPages} />
                )}

                {dataEvents?.data?.length < 1 && !isLoadingEvents && !isRefetchingEvents && (
                    <div className="flex flex-col items-center justify-center gap-4 py-20">
                        <Image
                            src="/images/illustrations/not-found.svg"
                            alt="not-found"
                            width={300}
                            height={300}
                        />
                        <h2 className="text-center text-3xl font-bold text-primary">
                            Event not Found.
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Event;