import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import { Dispatch, SetStateAction, useEffect } from "react";
import useRemoveTransactionModal from "./useRemoveTransactionModal";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    refetchTransaction: () => void;
    onOpenChange: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
}

const RemoveTransactionModal = (props: PropTypes) => {
    const { isOpen, onClose, refetchTransaction, onOpenChange, selectedId, setSelectedId } = props;
    const {
        mutateRemoveTransaction,
        isPendingMutateRemoveTransaction,
        isSuccessMutateRemoveTransaction,
    } = useRemoveTransactionModal();

    useEffect(() => {
        if (isSuccessMutateRemoveTransaction) {
            onClose();
            refetchTransaction();
            setSelectedId("");
        }
    }, [isSuccessMutateRemoveTransaction]);

    return (
        <Modal isOpen={isOpen} placement="center" scrollBehavior="inside" onOpenChange={onOpenChange}>
            <ModalContent className="m-4">
                <ModalHeader>
                    Remove Transaction
                </ModalHeader>
                <ModalBody>
                    <p className="text-medium">Are you sure you wanna removing this transaction?</p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        variant="flat"
                        onPress={() => { onClose(); setSelectedId(""); }}
                        disabled={isPendingMutateRemoveTransaction}
                    >Cancel</Button>
                    <Button
                        color="danger"
                        type="submit"
                        disabled={isPendingMutateRemoveTransaction}
                        onPress={() => mutateRemoveTransaction(selectedId)}
                    >{isPendingMutateRemoveTransaction ? (<Spinner size="sm" color="white" variant="wave" />) : ("Remove Transaction")}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    );
}

export default RemoveTransactionModal;