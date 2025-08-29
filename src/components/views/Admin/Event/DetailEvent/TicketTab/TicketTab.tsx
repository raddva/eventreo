import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import { convertIDR } from "@/utils/currency";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useDisclosure } from "@heroui/modal";
import { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_TICKET } from "./TicketTab.constants";
import useTicketTab from "./useTicketTab";

const TicketTab = () => {
    const {
        dataTicket,
        refetchTicket,
        isPendingTicket,
        isRefetchingTicket,
    } = useTicketTab();

    const addTicketModal = useDisclosure();
    const updateTicketModal = useDisclosure();
    const deleteTicketModal = useDisclosure();

    const renderCell = useCallback(
        (ticket: Record<string, unknown>, columnKey: Key) => {
            const cellValue = ticket[columnKey as keyof typeof ticket]

            switch (columnKey) {
                case "price":
                    return `${convertIDR(cellValue as number)}`
                case "actions":
                    return (
                        <DropdownAction
                            onPressButtonDelete={() => { deleteTicketModal.onOpen() }}
                            onPressButtonDetail={() => { updateTicketModal.onOpen() }} />
                    )
                default:
                    return cellValue as ReactNode;
            }
        }, [],
    );

    return (
        <Card className="w-full p-4">
            <CardHeader className="justify-between items-center">
                <div className="flex flex-col items-center">
                    <h1 className="w-full text-xl font-bold">Event Tickets</h1>
                    <p className="text-small text-default-400 w-full">Manage Tickets of this event</p>
                </div>
                <Button color="primary">
                    Add New Ticket
                </Button>
            </CardHeader>
            <CardBody className="pt-0">
                <DataTable
                    emptyContent="Ticket is Empty"
                    renderCell={renderCell}
                    columns={COLUMN_LIST_TICKET}
                    data={dataTicket || []}
                    isLoading={isPendingTicket || isRefetchingTicket}
                    totalPages={1}
                    showLimit={false}
                    showSearch={false}
                />
            </CardBody>
        </Card>
    )
}

export default TicketTab;