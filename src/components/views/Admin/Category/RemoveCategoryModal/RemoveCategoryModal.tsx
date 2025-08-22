import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import { Dispatch, SetStateAction, useEffect } from "react";
import useRemoveCategoryModal from "./useRemoveCategoryModal";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    refetchCategory: () => void;
    onOpenChange: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
}

const RemoveCategoryModal = (props: PropTypes) => {
    const { isOpen, onClose, refetchCategory, onOpenChange, selectedId, setSelectedId } = props;
    const {
        mutateRemoveCategory,
        isPendingMutateRemoveCategory,
        isSuccessMutateRemoveCategory,
    } = useRemoveCategoryModal();

    useEffect(() => {
        if (isSuccessMutateRemoveCategory) {
            onClose();
            refetchCategory();
        }
    }, [isSuccessMutateRemoveCategory]);

    return (
        <Modal isOpen={isOpen} placement="center" scrollBehavior="inside" onOpenChange={onOpenChange}>
            <ModalContent className="m-4">
                <ModalHeader>
                    Remove Category
                </ModalHeader>
                <ModalBody>
                    <p className="text-medium">Are you sure you wanna removing this category?</p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        variant="flat"
                        onPress={() => { onClose(); setSelectedId(""); }}
                        disabled={isPendingMutateRemoveCategory}
                    >Cancel</Button>
                    <Button
                        color="danger"
                        type="submit"
                        disabled={isPendingMutateRemoveCategory}
                        onPress={() => mutateRemoveCategory(selectedId)}
                    >{isPendingMutateRemoveCategory ? (<Spinner size="sm" color="white" variant="wave" />) : ("Remove Category")}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    );
}

export default RemoveCategoryModal;