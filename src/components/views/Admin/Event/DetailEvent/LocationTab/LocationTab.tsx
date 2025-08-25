import { IEventForm, IRegency } from "@/types/Event";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Input, Textarea } from "@heroui/input";
import { Skeleton } from "@heroui/skeleton";
import useLocationTab from "./useLocationTab";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Spinner } from "@heroui/spinner";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

import { Select, SelectItem } from "@heroui/select";

interface PropTypes {
    dataEvent: IEventForm;
    onUpdate: (data: IEventForm) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
    isPendingDefaultRegion: boolean;
    dataDefaultRegion: string;
}

const LocationTab = (props: PropTypes) => {
    const { dataEvent, onUpdate, isPendingUpdate, isSuccessUpdate, dataDefaultRegion, isPendingDefaultRegion } = props;
    const {
        controlUpdateLocation,
        errorsUpdateLocation,
        handleSubmitUpdateLocation,
        resetUpdateLocation,
        setValueUpdateLocation,
        dataRegion,
        handleSearchRegion,
        searchRegency
    } = useLocationTab();

    useEffect(() => {
        if (dataEvent) {
            setValueUpdateLocation("isOnline", `${dataEvent?.isOnline}`);
            setValueUpdateLocation("region", `${dataEvent?.location?.region}`);
            setValueUpdateLocation("latitude", `${dataEvent?.location?.coordinates[0]}`);
            setValueUpdateLocation("longitude", `${dataEvent?.location?.coordinates[1]}`);
            setValueUpdateLocation("address", `${dataEvent?.location?.address}`);
        }

        if (isSuccessUpdate) {
            resetUpdateLocation();
        }
    }, [dataEvent, isSuccessUpdate]);


    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="w-full text-xl font-bold">Event Location</h1>
                <p className="text-small text-default-400 w-full">Manage Location of this event</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateLocation(onUpdate)}>
                    <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
                        <Controller
                            control={controlUpdateLocation}
                            name="isOnline"
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Online / Offline"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    isInvalid={errorsUpdateLocation.isOnline !== undefined}
                                    errorMessage={errorsUpdateLocation.isOnline?.message}
                                    disallowEmptySelection
                                    defaultSelectedKeys={[dataEvent?.isOnline ? "true" : "false"]}
                                >
                                    <SelectItem key="true" textValue="Online">Online</SelectItem>
                                    <SelectItem key="false" textValue="Offline">Offline</SelectItem>
                                </Select>
                            )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.location?.region && !isPendingDefaultRegion} className="rounded-lg">
                        {!isPendingDefaultRegion ? (
                            <Controller
                                control={controlUpdateLocation}
                                name="region"
                                render={({ field: { onChange, ...field } }) => (
                                    <Autocomplete
                                        defaultItems={dataRegion?.data.data && searchRegency !== "" ? dataRegion?.data.data : []}
                                        {...field}
                                        label="City"
                                        defaultInputValue={dataDefaultRegion}
                                        variant="bordered"
                                        labelPlacement="outside"
                                        isInvalid={errorsUpdateLocation.region !== undefined}
                                        errorMessage={errorsUpdateLocation.region?.message}
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
                        ) :
                            (<div className="w-full h-16" />)
                        }
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.location?.address} className="rounded-lg">
                        <Controller
                            control={controlUpdateLocation}
                            name="address"
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    labelPlacement="outside"
                                    label="Address"
                                    variant="bordered"
                                    defaultValue={dataEvent?.location?.address}
                                    isInvalid={errorsUpdateLocation.address !== undefined}
                                    errorMessage={errorsUpdateLocation.address?.message}
                                />
                            )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.location?.coordinates[0]} className="rounded-lg">
                        <Controller
                            control={controlUpdateLocation}
                            name="latitude"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    labelPlacement="outside"
                                    label="Latitude"
                                    variant="bordered"
                                    defaultValue={dataEvent?.location?.coordinates[0] !== undefined ? String(dataEvent.location.coordinates[0]) : undefined}
                                    isInvalid={errorsUpdateLocation.latitude !== undefined}
                                    errorMessage={errorsUpdateLocation.latitude?.message}
                                />
                            )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.location?.coordinates[1]} className="rounded-lg">
                        <Controller
                            control={controlUpdateLocation}
                            name="longitude"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    labelPlacement="outside"
                                    label="Latitude"
                                    variant="bordered"
                                    defaultValue={dataEvent?.location?.coordinates[1] !== undefined ? String(dataEvent.location.coordinates[1]) : undefined}
                                    isInvalid={errorsUpdateLocation.longitude !== undefined}
                                    errorMessage={errorsUpdateLocation.longitude?.message}
                                />
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

export default LocationTab;