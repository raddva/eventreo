import { IEventForm, IRegency } from "@/types/Event";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Input, Textarea } from "@heroui/input";
import { Skeleton } from "@heroui/skeleton";
import useInfoTab from "./useInfoTab";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Spinner } from "@heroui/spinner";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { ICategory } from "@/types/Category";
import { DatePicker } from "@heroui/date-picker";
import { toInputDate } from "@/utils/date";
import { Select, SelectItem } from "@heroui/select";

interface PropTypes {
    dataEvent: IEventForm;
    onUpdate: (data: IEventForm) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
    const { dataEvent, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
    const {
        controlUpdateInfo,
        errorsUpdateInfo,
        handleSubmitUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
        dataCategory,
    } = useInfoTab();

    useEffect(() => {
        if (dataEvent) {
            setValueUpdateInfo("name", `${dataEvent?.name}`);
            setValueUpdateInfo("slug", `${dataEvent?.slug}`);
            setValueUpdateInfo("category", `${dataEvent?.category}`);
            setValueUpdateInfo("startDate", toInputDate(dataEvent?.startDate));
            setValueUpdateInfo("endDate", toInputDate(dataEvent?.endDate));
            setValueUpdateInfo("isPublish", `${dataEvent?.isPublish}`);
            setValueUpdateInfo("isFeatured", `${dataEvent?.isFeatured}`);
            setValueUpdateInfo("description", `${dataEvent?.description}`);
        }

        if (isSuccessUpdate) {
            resetUpdateInfo();
        }
    }, [dataEvent, isSuccessUpdate]);


    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="w-full text-xl font-bold">Event Information</h1>
                <p className="text-small text-default-400 w-full">Manage Information of this event</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateInfo(onUpdate)}>
                    <Skeleton isLoaded={!!dataEvent?.name} className="rounded-lg">
                        <Controller
                            control={controlUpdateInfo}
                            name="name"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Event Name"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    type="text"
                                    isInvalid={errorsUpdateInfo.name !== undefined}
                                    errorMessage={errorsUpdateInfo.name?.message}
                                    defaultValue={dataEvent?.name} />
                            )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.slug} className="rounded-lg">
                        <Controller
                            control={controlUpdateInfo}
                            name="slug"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Slug"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    type="text"
                                    isInvalid={errorsUpdateInfo.slug !== undefined}
                                    errorMessage={errorsUpdateInfo.slug?.message}
                                    defaultValue={dataEvent?.slug} />
                            )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.category} className="rounded-lg">
                        <Controller
                            control={controlUpdateInfo}
                            name="category"
                            render={({ field: { onChange, ...field } }) => (
                                <Autocomplete
                                    defaultItems={dataCategory?.data.data || []}
                                    {...field}
                                    labelPlacement="outside"
                                    label="Category"
                                    variant="bordered"
                                    isInvalid={errorsUpdateInfo.category !== undefined}
                                    errorMessage={errorsUpdateInfo.category?.message}
                                    onSelectionChange={(value) => onChange(value)}
                                    placeholder="Search Category"
                                    defaultSelectedKey={dataEvent?.category}>
                                    {(category: ICategory) => (
                                        <AutocompleteItem key={`${category._id}`}>
                                            {category.name}
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>
                            )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.startDate} className="rounded-lg">
                        <Controller
                            control={controlUpdateInfo}
                            name="startDate"
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    defaultValue={toInputDate(dataEvent?.startDate)}
                                    labelPlacement="outside"
                                    label="Start Date"
                                    variant="bordered"
                                    hideTimeZone
                                    showMonthAndYearPickers
                                    isInvalid={errorsUpdateInfo.startDate !== undefined}
                                    errorMessage={errorsUpdateInfo.startDate?.message}
                                />
                            )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.endDate} className="rounded-lg">
                        <Controller
                            control={controlUpdateInfo}
                            name="endDate"
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    defaultValue={toInputDate(dataEvent?.endDate)}
                                    labelPlacement="outside"
                                    label="End Date"
                                    variant="bordered"
                                    hideTimeZone
                                    showMonthAndYearPickers
                                    isInvalid={errorsUpdateInfo.endDate !== undefined}
                                    errorMessage={errorsUpdateInfo.endDate?.message}
                                />
                            )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
                        <Controller
                            control={controlUpdateInfo}
                            name="isPublish"
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    labelPlacement="outside"
                                    label="Status"
                                    variant="bordered"
                                    isInvalid={errorsUpdateInfo.isPublish !== undefined}
                                    errorMessage={errorsUpdateInfo.isPublish?.message}
                                    disallowEmptySelection
                                    defaultSelectedKeys={[dataEvent?.isPublish ? "true" : "false"]}
                                >
                                    <SelectItem key="true" textValue="Publish">Publish</SelectItem>
                                    <SelectItem key="false" textValue="Draft">Draft</SelectItem>
                                </Select>
                            )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
                        <Controller
                            control={controlUpdateInfo}
                            name="isFeatured"
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Featured"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    isInvalid={errorsUpdateInfo.isFeatured !== undefined}
                                    errorMessage={errorsUpdateInfo.isFeatured?.message}
                                    disallowEmptySelection
                                    defaultSelectedKeys={[dataEvent?.isFeatured ? "true" : "false"]}
                                >
                                    <SelectItem key="true" textValue="Yes">Yes</SelectItem>
                                    <SelectItem key="false" textValue="No">No</SelectItem>
                                </Select>
                            )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.description} className="rounded-lg">
                        <Controller
                            control={controlUpdateInfo}
                            name="description"
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    label="Description"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    isInvalid={errorsUpdateInfo.description !== undefined}
                                    errorMessage={errorsUpdateInfo.description?.message}
                                    defaultValue={dataEvent?.description} />
                            )} />
                    </Skeleton>
                    <Button color="primary"
                        className="mt-2 disabled:bg-default-500"
                        type="submit"
                        disabled={isPendingUpdate || !dataEvent?._id}>
                        {isPendingUpdate ? <Spinner size="sm" color="white" variant="wave" /> : "Save Changes"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default InfoTab;