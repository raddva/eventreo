import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import { Dispatch, SetStateAction, useEffect } from "react";
import useRemoveBannerModal from "./useRemoveBannerModal";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    refetchBanner: () => void;
    onOpenChange: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
}

const RemoveBannerModal = (props: PropTypes) => {
    const { isOpen, onClose, refetchBanner, onOpenChange, selectedId, setSelectedId } = props;
    const {
        mutateRemoveBanner,
        isPendingMutateRemoveBanner,
        isSuccessMutateRemoveBanner,
    } = useRemoveBannerModal();

    useEffect(() => {
        if (isSuccessMutateRemoveBanner) {
            onClose();
            refetchBanner();
            setSelectedId("");
        }
    }, [isSuccessMutateRemoveBanner]);

    return (
        <Modal isOpen={isOpen} placement="center" scrollBehavior="inside" onOpenChange={onOpenChange}>
            <ModalContent className="m-4">
                <ModalHeader>
                    Remove Banner
                </ModalHeader>
                <ModalBody>
                    <p className="text-medium">Are you sure you wanna removing this banner?</p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        variant="flat"
                        onPress={() => { onClose(); setSelectedId(""); }}
                        disabled={isPendingMutateRemoveBanner}
                    >Cancel</Button>
                    <Button
                        color="danger"
                        type="submit"
                        disabled={isPendingMutateRemoveBanner}
                        onPress={() => mutateRemoveBanner(selectedId)}
                    >{isPendingMutateRemoveBanner ? (<Spinner size="sm" color="white" variant="wave" />) : ("Remove Banner")}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    );
}

export default RemoveBannerModal;