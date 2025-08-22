import { Input, Textarea } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { useEffect } from "react";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    refetchCategory: () => void;
    onOpenChange: () => void;
}

const AddCategoryModal = (props: PropTypes) => {
    const { isOpen, onClose, refetchCategory, onOpenChange } = props;

    const {
        control,
        errors,
        handleSubmitForm,
        handleAddCategory,
        isPendingMutateAddCategory,
        isSuccessMutateAddCategory,
        handleUploadIcon,
        isPendingMutateUploadFile,
        preview,
        handleRemoveIcon,
        isPendingMutateRemoveFile,
        handleOnClose
    } = useAddCategoryModal();

    useEffect(() => {
        if (isSuccessMutateAddCategory) {
            onClose();
            refetchCategory();
        }
    });

    const disabledSubmit = isPendingMutateAddCategory || isPendingMutateUploadFile || isPendingMutateRemoveFile;

    return (
        <Modal isOpen={isOpen} placement="center" scrollBehavior="inside" onOpenChange={onOpenChange}
            onClose={() => handleOnClose(onClose)}
        >
            <form onSubmit={handleSubmitForm(handleAddCategory)}>
                <ModalContent className="m-4">
                    <ModalHeader>
                        Add Category
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-bold">Information</p>
                            <Controller
                                control={control}
                                name="name"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        autoFocus label="Category Name"
                                        variant="bordered"
                                        type="text"
                                        isInvalid={errors.name !== undefined}
                                        errorMessage={errors.name?.message}
                                        className="mb-2" />
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
                                        className="mb-2" />
                                )} />
                            <p className="text-sm font-bold">Icon</p>
                            <Controller
                                control={control}
                                name="icon"
                                render={({ field: { onChange, value, ...field } }) => (
                                    <InputFile {...field}
                                        onRemove={() => handleRemoveIcon(onChange)}
                                        onUpload={(files) => handleUploadIcon(files, onChange)}
                                        isUploading={isPendingMutateUploadFile}
                                        isRemoving={isPendingMutateRemoveFile}
                                        isInvalid={errors.icon !== undefined}
                                        errorMessage={errors.icon?.message}
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
                        >{isPendingMutateAddCategory ? (<Spinner size="sm" color="white" variant="wave" />) : ("Create Category")}</Button>
                    </ModalFooter>
                </ModalContent>
            </form>

        </Modal >
    )
}

export default AddCategoryModal;