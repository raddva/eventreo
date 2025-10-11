import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Skeleton } from "@heroui/skeleton";
import useInfoTab from "./useInfoTab";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Spinner } from "@heroui/spinner";
import { IProfile } from "@/types/Auth";
import { Input } from "@heroui/input";

interface PropTypes {
    profileData: IProfile;
    onUpdate: (data: IProfile) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
    const { profileData, onUpdate, isPendingUpdate, isSuccessUpdate, } = props;
    const {
        controlUpdateInfo,
        errorsUpdateInfo,
        handleSubmitUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
    } = useInfoTab();

    useEffect(() => {
        if (profileData) {
            setValueUpdateInfo("fullName", `${profileData?.fullName}`);
        }

        if (isSuccessUpdate) {
            resetUpdateInfo();
        }
    }, [profileData, isSuccessUpdate]);


    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="w-full text-xl font-bold">Personal Information</h1>
                <p className="text-small text-default-400 w-full">Manage your personal information</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateInfo(onUpdate)}>
                    <Skeleton isLoaded={!!profileData?.username} className="rounded-lg">
                        <Input
                            labelPlacement="outside"
                            label="Username"
                            variant="bordered"
                            value={profileData?.username}
                            readOnly
                        />
                    </Skeleton>
                    <Skeleton isLoaded={!!profileData?.email} className="rounded-lg">
                        <Input
                            labelPlacement="outside"
                            label="Email"
                            variant="bordered"
                            value={profileData?.email}
                            readOnly
                        />
                    </Skeleton>
                    <Skeleton isLoaded={!!profileData?.role} className="rounded-lg">
                        <Input
                            labelPlacement="outside"
                            label="Role"
                            variant="bordered"
                            className="capitalize"
                            value={profileData?.role}
                            readOnly
                        />
                    </Skeleton>
                    <Skeleton isLoaded={!!profileData?.fullName} className="rounded-lg">
                        <Controller
                            control={controlUpdateInfo}
                            name="fullName"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    labelPlacement="outside"
                                    label="Full Name"
                                    variant="bordered"
                                    placeholder="Input Full Name"
                                    defaultValue={profileData?.fullName || ""}
                                    isInvalid={errorsUpdateInfo.fullName !== undefined}
                                    errorMessage={errorsUpdateInfo.fullName?.message}
                                />
                            )} />
                    </Skeleton>
                    <Button color="primary"
                        className="mt-2 disabled:bg-default-500"
                        type="submit"
                        disabled={isPendingUpdate || !profileData?._id}>
                        {isPendingUpdate ? <Spinner size="sm" color="white" variant="wave" /> : "Save Changes"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default InfoTab;