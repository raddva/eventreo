import { Input, Textarea } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import useAddTicketModal from "./useAddTicketModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { useEffect } from "react";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    refetchTicket: () => void;
    onOpenChange: () => void;
}

const AddTicketModal = (props: PropTypes) => {
    const { isOpen, onClose, refetchTicket, onOpenChange } = props;

    const {
        control,
        errors,
        reset,
        handleSubmitForm,
        handleAddTicket,
        isPendingMutateAddTicket,
        isSuccessMutateAddTicket,
    } = useAddTicketModal();

    useEffect(() => {
        if (isSuccessMutateAddTicket) {
            onClose();
            refetchTicket();
        }
    }, [isSuccessMutateAddTicket, onClose, refetchTicket]);

    const handleOnCLose = () => {
        reset(); onClose();
    }

    return (
        <Modal isOpen={isOpen} placement="center" scrollBehavior="inside" onOpenChange={onOpenChange}
            onClose={() => handleOnCLose}
        >
            <form onSubmit={handleSubmitForm(handleAddTicket)}>
                <ModalContent className="m-4">
                    <ModalHeader>
                        Add Ticket
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm font-bold">Information</p>
                            <div className="flex flex-col gap-4">
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            autoFocus label="Ticket Name"
                                            variant="bordered"
                                            type="text"
                                            isInvalid={errors.name !== undefined}
                                            errorMessage={errors.name?.message}
                                        />
                                    )} />
                                <Controller
                                    control={control}
                                    name="price"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Price"
                                            variant="bordered"
                                            type="text"
                                            isInvalid={errors.price !== undefined}
                                            errorMessage={errors.price?.message}
                                        />
                                    )} />
                                <Controller
                                    control={control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Quantity"
                                            variant="bordered"
                                            type="text"
                                            isInvalid={errors.quantity !== undefined}
                                            errorMessage={errors.quantity?.message}
                                        />
                                    )} />
                                <Controller
                                    control={control}
                                    name="description"
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            label="Description"
                                            variant="bordered"
                                            isInvalid={errors.description !== undefined}
                                            errorMessage={errors.description?.message}
                                        />
                                    )} />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="danger"
                            variant="bordered"
                            onPress={() => handleOnCLose}
                            disabled={isPendingMutateAddTicket}
                        >Cancel</Button>
                        <Button
                            color="primary"
                            type="submit"
                            disabled={isPendingMutateAddTicket}
                        >{isPendingMutateAddTicket ? (<Spinner size="sm" color="white" variant="wave" />) : ("Create Ticket")}</Button>
                    </ModalFooter>
                </ModalContent>
            </form>

        </Modal >
    )
}

export default AddTicketModal;