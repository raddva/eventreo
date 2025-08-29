import { Input, Textarea } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import useAddBannerModal from "./useAddBannerModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { useEffect } from "react";
import { Select, SelectItem } from "@heroui/select";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    refetchBanner: () => void;
    onOpenChange: () => void;
}

const AddBannerModal = (props: PropTypes) => {
    const { isOpen, onClose, refetchBanner, onOpenChange } = props;

    const {
        control,
        errors,
        handleSubmitForm,
        handleAddBanner,
        isPendingMutateAddBanner,
        isSuccessMutateAddBanner,
        handleUploadImage,
        isPendingMutateUploadFile,
        preview,
        handleRemoveImage,
        isPendingMutateRemoveFile,
        handleOnClose
    } = useAddBannerModal();

    useEffect(() => {
        if (isSuccessMutateAddBanner) {
            onClose();
            refetchBanner();
        }
    }, [isSuccessMutateAddBanner, onClose, refetchBanner]);

    const disabledSubmit = isPendingMutateAddBanner || isPendingMutateUploadFile || isPendingMutateRemoveFile;

    return (
        <Modal isOpen={isOpen} placement="center" scrollBehavior="inside" onOpenChange={onOpenChange}
            onClose={() => handleOnClose(onClose)}
        >
            <form onSubmit={handleSubmitForm(handleAddBanner)}>
                <ModalContent className="m-4">
                    <ModalHeader>
                        Add Banner
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-bold">Information</p>
                            <Controller
                                control={control}
                                name="title"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        autoFocus label="Banner Name"
                                        variant="bordered"
                                        type="text"
                                        isInvalid={errors.title !== undefined}
                                        errorMessage={errors.title?.message}
                                        className="mb-2" />
                                )} />
                            <Controller
                                control={control}
                                name="isShow"
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Show Status"
                                        variant="bordered"
                                        isInvalid={errors.isShow !== undefined}
                                        errorMessage={errors.isShow?.message}
                                        disallowEmptySelection
                                    >
                                        <SelectItem key="true" textValue="Show">Show</SelectItem>
                                        <SelectItem key="false" textValue="Hide">Hide</SelectItem>
                                    </Select>
                                )} />
                            <p className="text-sm font-bold">Image</p>
                            <Controller
                                control={control}
                                name="image"
                                render={({ field: { onChange, value, ...field } }) => (
                                    <InputFile {...field}
                                        onRemove={() => handleRemoveImage(onChange)}
                                        onUpload={(files) => handleUploadImage(files, onChange)}
                                        isUploading={isPendingMutateUploadFile}
                                        isRemoving={isPendingMutateRemoveFile}
                                        isInvalid={errors.image !== undefined}
                                        errorMessage={errors.image?.message}
                                        isDropable
                                        preview={typeof preview == "string" ? preview : ""}
                                    />
                                )} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="danger"
                            variant="bordered"
                            onPress={() => handleOnClose(onClose)}
                            disabled={disabledSubmit}
                        >Cancel</Button>
                        <Button
                            color="primary"
                            type="submit"
                            disabled={disabledSubmit}
                        >{isPendingMutateAddBanner ? (<Spinner size="sm" color="white" variant="wave" />) : ("Create Banner")}</Button>
                    </ModalFooter>
                </ModalContent>
            </form>

        </Modal >
    )
}

export default AddBannerModal;