import { Input, Textarea } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import useAddEventModal from "./useAddEventModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { ICategory } from "@/types/Category";
import { DatePicker } from "@heroui/date-picker";
import { Select, SelectItem } from "@heroui/select";
import { IRegency } from "@/types/Event";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    refetchEvents: () => void;
    onOpenChange: () => void;
}

const AddEventModal = (props: PropTypes) => {
    const { isOpen, onClose, refetchEvents, onOpenChange } = props;

    const {
        dataCategory,
        dataRegion,
        control,
        errors,
        handleSubmitForm,
        handleAddEvent,
        isPendingMutateAddEvent,
        isSuccessMutateAddEvent,
        handleUploadBanner,
        isPendingMutateUploadFile,
        preview,
        handleRemoveBanner,
        isPendingMutateRemoveFile,
        handleOnClose,
        handleSearchRegion,
        searchRegency
    } = useAddEventModal();

    useEffect(() => {
        if (isSuccessMutateAddEvent) {
            onClose();
            refetchEvents();
        }
    });

    const disabledSubmit = isPendingMutateAddEvent || isPendingMutateUploadFile || isPendingMutateRemoveFile;

    return (
        <Modal isOpen={isOpen} placement="center" scrollBehavior="inside" onOpenChange={onOpenChange}
            onClose={() => handleOnClose(onClose)}
        >
            <form onSubmit={handleSubmitForm(handleAddEvent)}>
                <ModalContent className="m-4">
                    <ModalHeader>
                        Add Event
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-bold">Information</p>
                            <div className="flex flex-col gap-4 mb-4">
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            autoFocus label="Name"
                                            variant="bordered"
                                            isInvalid={errors.name !== undefined}
                                            errorMessage={errors.name?.message}
                                        />
                                    )} />
                                <Controller
                                    control={control}
                                    name="slug"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Slug"
                                            variant="bordered"
                                            isInvalid={errors.slug !== undefined}
                                            errorMessage={errors.slug?.message}
                                        />
                                    )} />
                                <Controller
                                    control={control}
                                    name="category"
                                    render={({ field: { onChange, ...field } }) => (
                                        <Autocomplete
                                            defaultItems={dataCategory?.data.data || []}
                                            {...field}
                                            label="Category"
                                            variant="bordered"
                                            isInvalid={errors.category !== undefined}
                                            errorMessage={errors.category?.message}
                                            onSelectionChange={(value) => onChange(value)}
                                            placeholder="Search Category">
                                            {(category: ICategory) => (
                                                <AutocompleteItem key={`${category._id}`}>
                                                    {category.name}
                                                </AutocompleteItem>
                                            )}
                                        </Autocomplete>
                                    )} />
                                <Controller
                                    control={control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <DatePicker
                                            {...field}
                                            label="Start Date"
                                            variant="bordered"
                                            hideTimeZone
                                            showMonthAndYearPickers
                                            isInvalid={errors.startDate !== undefined}
                                            errorMessage={errors.startDate?.message}
                                        />
                                    )} />
                                <Controller
                                    control={control}
                                    name="endDate"
                                    render={({ field }) => (
                                        <DatePicker
                                            {...field}
                                            label="End Date"
                                            variant="bordered"
                                            hideTimeZone
                                            showMonthAndYearPickers
                                            isInvalid={errors.endDate !== undefined}
                                            errorMessage={errors.endDate?.message}
                                        />
                                    )} />
                                <Controller
                                    control={control}
                                    name="isPublished"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Status"
                                            variant="bordered"
                                            isInvalid={errors.isPublished !== undefined}
                                            errorMessage={errors.isPublished?.message}
                                            disallowEmptySelection
                                        >
                                            <SelectItem key="true" textValue="Publish">Publish</SelectItem>
                                            <SelectItem key="false" textValue="Draft">Draft</SelectItem>
                                        </Select>
                                    )} />
                                <Controller
                                    control={control}
                                    name="isFeatured"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Featured"
                                            variant="bordered"
                                            isInvalid={errors.isFeatured !== undefined}
                                            errorMessage={errors.isFeatured?.message}
                                            disallowEmptySelection
                                        >
                                            <SelectItem key="true" textValue="Yes">Yes</SelectItem>
                                            <SelectItem key="false" textValue="No">No</SelectItem>
                                        </Select>
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
                            <p className="text-sm font-bold">Location</p>
                            <div className="flex flex-col gap-4 mb-4">
                                <Controller
                                    control={control}
                                    name="region"
                                    render={({ field: { onChange, ...field } }) => (
                                        <Autocomplete
                                            defaultItems={dataRegion?.data.data && searchRegency !== "" ? dataRegion?.data.data : []}
                                            {...field}
                                            label="City"
                                            variant="bordered"
                                            isInvalid={errors.region !== undefined}
                                            errorMessage={errors.region?.message}
                                            onInputChange={(search) => handleSearchRegion(search)}
                                            onSelectionChange={(value) => onChange(value)}
                                            placeholder="Search City">
                                            {(regency: IRegency) => (
                                                <AutocompleteItem key={`${regency.id}`}>
                                                    {regency.name}
                                                </AutocompleteItem>
                                            )}
                                        </Autocomplete>
                                    )} />
                                <Controller
                                    control={control}
                                    name="latitude"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Latitude"
                                            variant="bordered"
                                            isInvalid={errors.latitude !== undefined}
                                            errorMessage={errors.latitude?.message}
                                        />
                                    )} />
                                <Controller
                                    control={control}
                                    name="longitude"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Longitude"
                                            variant="bordered"
                                            isInvalid={errors.longitude !== undefined}
                                            errorMessage={errors.longitude?.message}
                                        />
                                    )} />
                            </div>
                            <p className="text-sm font-bold">Cover</p>
                            <Controller
                                control={control}
                                name="banner"
                                render={({ field: { onChange, value, ...field } }) => (
                                    <InputFile {...field}
                                        onRemove={() => handleRemoveBanner(onChange)}
                                        onUpload={(files) => handleUploadBanner(files, onChange)}
                                        isUploading={isPendingMutateUploadFile}
                                        isRemoving={isPendingMutateRemoveFile}
                                        isInvalid={errors.banner !== undefined}
                                        errorMessage={errors.banner?.message}
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
                        >{isPendingMutateAddEvent ? (<Spinner size="sm" color="white" variant="wave" />) : ("Create Event")}</Button>
                    </ModalFooter>
                </ModalContent>
            </form>

        </Modal >
    )
}

export default AddEventModal;