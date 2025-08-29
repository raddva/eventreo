import { Input, Textarea } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import useUpdateTicketModal from "./useUpdateTicketModal";
import { Controller } from "react-hook-form";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ITicket } from "@/types/Ticket";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    refetchTicket: () => void;
    onOpenChange: () => void;
    selectedDataTicket: ITicket | null;
    setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>;
}

const UpdateTicketModal = (props: PropTypes) => {
    const { isOpen, onClose, refetchTicket, onOpenChange, selectedDataTicket, setSelectedDataTicket } = props;

    const {
        control,
        errors,
        reset,
        handleSubmitForm,
        handleUpdateTicket,
        isPendingMutateUpdateTicket,
        isSuccessMutateUpdateTicket,
        setValueUpdateTicket
    } = useUpdateTicketModal(`${selectedDataTicket?._id}`);

    useEffect(() => {
        if (isSuccessMutateUpdateTicket) {
            onClose();
            refetchTicket();
            setSelectedDataTicket(null);
        }
    }, [isSuccessMutateUpdateTicket, onClose, refetchTicket]);

    useEffect(() => {
        if (selectedDataTicket) {
            setValueUpdateTicket("name", `${selectedDataTicket?.name}`);
            setValueUpdateTicket("price", `${selectedDataTicket?.price}`);
            setValueUpdateTicket("quantity", `${selectedDataTicket?.quantity}`);
            setValueUpdateTicket("description", `${selectedDataTicket?.description}`);
        }
    }, [selectedDataTicket]);

    const handleOnCLose = () => {
        reset(); onClose(); setSelectedDataTicket(null);
    }

    return (
        <Modal isOpen={isOpen} placement="center" scrollBehavior="inside" onOpenChange={onOpenChange}
            onClose={() => handleOnCLose}
        >
            <form onSubmit={handleSubmitForm(handleUpdateTicket)}>
                <ModalContent className="m-4">
                    <ModalHeader>
                        Update Ticket
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
                            disabled={isPendingMutateUpdateTicket}
                        >Cancel</Button>
                        <Button
                            color="primary"
                            type="submit"
                            disabled={isPendingMutateUpdateTicket}
                        >{isPendingMutateUpdateTicket ? (<Spinner size="sm" color="white" variant="wave" />) : ("Create Ticket")}</Button>
                    </ModalFooter>
                </ModalContent>
            </form>

        </Modal >
    )
}

export default UpdateTicketModal;