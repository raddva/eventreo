import { IBanner } from "@/types/Banner";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Input, Textarea } from "@heroui/input";
import { Skeleton } from "@heroui/skeleton";
import useInfoTab from "./useInfoTab";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Spinner } from "@heroui/spinner";
import { Select, SelectItem } from "@heroui/select";

interface PropTypes {
    dataBanner: IBanner;
    onUpdate: (data: IBanner) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
    const { dataBanner, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
    const {
        controlUpdateInfo,
        errorsUpdateInfo,
        handleSubmitUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
    } = useInfoTab();

    useEffect(() => {
        setValueUpdateInfo("title", `${dataBanner?.title}`);
        setValueUpdateInfo("isShow", `${dataBanner?.isShow}`);

        if (isSuccessUpdate) {
            resetUpdateInfo();
        }
    }, [dataBanner, isSuccessUpdate]);


    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="w-full text-xl font-bold">Banner Information</h1>
                <p className="text-small text-default-400 w-full">Manage Information of this category</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateInfo(onUpdate)}>
                    <Skeleton isLoaded={!!dataBanner?.title} className="rounded-lg">
                        <Controller
                            control={controlUpdateInfo}
                            name="title"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Banner Name"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    type="text"
                                    isInvalid={errorsUpdateInfo.title !== undefined}
                                    errorMessage={errorsUpdateInfo.title?.message}
                                    className="mt-2"
                                    defaultValue={dataBanner?.title} />
                            )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataBanner?.isShow} className="rounded-lg">
                        <Controller
                            control={controlUpdateInfo}
                            name="isShow"
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Show Status"
                                    variant="bordered"
                                    isInvalid={errorsUpdateInfo.isShow !== undefined}
                                    errorMessage={errorsUpdateInfo.isShow?.message}
                                    disallowEmptySelection
                                    defaultSelectedKeys={[dataBanner?.isShow ? "true" : "false"]}
                                >
                                    <SelectItem key="true" textValue="Show">Show</SelectItem>
                                    <SelectItem key="false" textValue="Hide">Hide</SelectItem>
                                </Select>
                            )} />
                    </Skeleton>
                    <Button color="primary"
                        className="mt-2 disabled:bg-default-500"
                        type="submit"
                        disabled={isPendingUpdate || !dataBanner?._id}>
                        {isPendingUpdate ? <Spinner size="sm" color="white" variant="wave" /> : "Save Changes"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default InfoTab;