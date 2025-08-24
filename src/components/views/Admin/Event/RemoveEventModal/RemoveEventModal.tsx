import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import { Dispatch, SetStateAction, useEffect } from "react";
import useRemoveEventModal from "./useRemoveEventModal";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    refetchEvents: () => void;
    onOpenChange: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
}

const RemoveEventModal = (props: PropTypes) => {
    const { isOpen, onClose, refetchEvents, onOpenChange, selectedId, setSelectedId } = props;
    const {
        mutateRemoveEvent,
        isPendingMutateRemoveEvent,
        isSuccessMutateRemoveEvent,
    } = useRemoveEventModal();

    useEffect(() => {
        if (isSuccessMutateRemoveEvent) {
            onClose();
            refetchEvents();
        }
    }, [isSuccessMutateRemoveEvent]);

    return (
        <Modal isOpen={isOpen} placement="center" scrollBehavior="inside" onOpenChange={onOpenChange}>
            <ModalContent className="m-4">
                <ModalHeader>
                    Remove Event
                </ModalHeader>
                <ModalBody>
                    <p className="text-medium">Are you sure you wanna removing this event?</p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        variant="flat"
                        onPress={() => { onClose(); setSelectedId(""); }}
                        disabled={isPendingMutateRemoveEvent}
                    >Cancel</Button>
                    <Button
                        color="danger"
                        type="submit"
                        disabled={isPendingMutateRemoveEvent}
                        onPress={() => mutateRemoveEvent(selectedId)}
                    >{isPendingMutateRemoveEvent ? (<Spinner size="sm" color="white" variant="wave" />) : ("Remove Event")}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    );
}

export default RemoveEventModal;