import DataTable from "@/components/ui/DataTable";
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci"
import { COLUMN_LIST_EVENT } from "./Event.constants";
import useEvent from "./useEvent";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";

const Event = () => {
    const router = useRouter();
    const { push, isReady, query } = useRouter();
    const { dataEvents, isLoadingEvents, refetchEvents, isRefetchingEvents, selectedId, setSelectedId } = useEvent();
    const addEventModal = useDisclosure();
    const removeEventModal = useDisclosure();
    const { setUrl } = useChangeUrl();

    useEffect(() => {
        if (isReady) {
            setUrl();
        }
    }, [isReady]);

    const renderCell = useCallback(
        (event: Record<string, unknown>, columnKey: Key) => {
            const cellValue = event[columnKey as keyof typeof event]

            switch (columnKey) {
                case "banner":
                    return (
                        <Image
                            className="aspect-video w-36 object-cover rounded-lg"
                            src={`${cellValue}`}
                            alt="banner"
                            width={200}
                            height={100} />
                    )
                case "actions":
                    return (
                        <DropdownAction
                            onPressButtonDelete={() => { setSelectedId(`${event._id}`); removeEventModal.onOpen(); }}
                            onPressButtonDetail={() => push(`event/${event._id}`)} />
                    )
                case "isPublish":
                    return (
                        <Chip color={cellValue ? "success" : "warning"} size="sm" variant="flat">
                            {cellValue == true ? "Published" : "Not Published"}
                        </Chip>
                    )
                default:
                    return cellValue as ReactNode;
            }
        }, [push],
    );
    return (
        <section>
            {Object.keys(query).length > 0 && (
                <DataTable
                    emptyContent="Event is Empty"
                    renderCell={renderCell}
                    columns={COLUMN_LIST_EVENT}
                    data={dataEvents?.data}
                    isLoading={isLoadingEvents || isRefetchingEvents}
                    buttonTopContentLabel="Create Event"
                    onClickButtonTopContent={addEventModal.onOpen}
                    totalPages={dataEvents?.pagination.totalPages}
                />
            )}
            {/* <AddEventModal {...addEventModal} refetchEvent={refetchEvent} />
            <RemoveEventModal {...removeEventModal} refetchEvent={refetchEvent} selectedId={selectedId} setSelectedId={setSelectedId} /> */}
        </section>
    )
}

export default Event;