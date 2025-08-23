import { ICategory } from "@/types/Category";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Input, Textarea } from "@heroui/input";
import { Skeleton } from "@heroui/skeleton";
import useInfoTab from "./useInfoTab";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Spinner } from "@heroui/spinner";

interface PropTypes {
    dataCategory: ICategory;
    onUpdate: (data: ICategory) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
    const { dataCategory, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
    const {
        controlUpdateInfo,
        errorsUpdateInfo,
        handleSubmitUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
    } = useInfoTab();

    useEffect(() => {
        setValueUpdateInfo("name", `${dataCategory?.name}`);
        setValueUpdateInfo("description", `${dataCategory?.description}`);

        if (isSuccessUpdate) {
            resetUpdateInfo();
        }
    }, [dataCategory, isSuccessUpdate]);


    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="w-full text-xl font-bold">Category Information</h1>
                <p className="text-small text-default-400 w-full">Manage Information of this category</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateInfo(onUpdate)}>
                    <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
                        <Controller
                            control={controlUpdateInfo}
                            name="name"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Category Name"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    type="text"
                                    isInvalid={errorsUpdateInfo.name !== undefined}
                                    errorMessage={errorsUpdateInfo.name?.message}
                                    className="mt-2"
                                    defaultValue={dataCategory?.name} />
                            )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
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
                                    defaultValue={dataCategory?.description} />
                            )} />
                    </Skeleton>
                    <Button color="primary"
                        className="mt-2 disabled:bg-default-500"
                        type="submit"
                        disabled={isPendingUpdate || !dataCategory?._id}>
                        {isPendingUpdate ? <Spinner size="sm" color="white" variant="wave" /> : "Save Changes"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default InfoTab;