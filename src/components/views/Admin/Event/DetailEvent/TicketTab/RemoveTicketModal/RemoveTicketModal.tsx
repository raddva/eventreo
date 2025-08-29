import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import { Dispatch, SetStateAction, useEffect } from "react";
import useRemoveTicketModal from "./useRemoveTicketModal";
import { ITicket } from "@/types/Ticket";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    refetchTicket: () => void;
    onOpenChange: () => void;
    selectedDataTicket: ITicket | null;
    setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>;
}

const RemoveTicketModal = (props: PropTypes) => {
    const { isOpen, onClose, refetchTicket, onOpenChange, selectedDataTicket, setSelectedDataTicket } = props;
    const {
        mutateRemoveTicket,
        isPendingMutateRemoveTicket,
        isSuccessMutateRemoveTicket,
    } = useRemoveTicketModal();

    useEffect(() => {
        if (isSuccessMutateRemoveTicket) {
            onClose();
            refetchTicket();
            setSelectedDataTicket(null);
        }
    }, [isSuccessMutateRemoveTicket]);

    return (
        <Modal isOpen={isOpen} placement="center" scrollBehavior="inside" onOpenChange={onOpenChange}>
            <ModalContent className="m-4">
                <ModalHeader>
                    Remove Ticket
                </ModalHeader>
                <ModalBody>
                    <p className="text-medium">Are you sure you wanna removing this ticket?</p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        variant="flat"
                        onPress={() => { onClose(); setSelectedDataTicket(null); }}
                        disabled={isPendingMutateRemoveTicket}
                    >Cancel</Button>
                    <Button
                        color="danger"
                        type="submit"
                        disabled={isPendingMutateRemoveTicket}
                        onPress={() => mutateRemoveTicket(`${selectedDataTicket?._id}`)}
                    >{isPendingMutateRemoveTicket ? (<Spinner size="sm" color="white" variant="wave" />) : ("Remove Ticket")}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    );
}

export default RemoveTicketModal;