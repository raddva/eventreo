import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Skeleton } from "@heroui/skeleton";
import useSecurityTab from "./useSecurityTab";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Spinner } from "@heroui/spinner";
import { IProfile } from "@/types/Auth";
import { Input } from "@heroui/input";

const SecurityTab = () => {
    const {
        controlUpdateSecurity,
        errorsUpdateSecurity,
        handleSubmitUpdateSecurity,
        resetUpdateSecurity,
        setValueUpdateSecurity,

        isPendingUpdatePassword,
        handleUpdatePassword,
    } = useSecurityTab();

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="w-full text-xl font-bold">Account Security</h1>
                <p className="text-small text-default-400 w-full">Manage your account security</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateSecurity(handleUpdatePassword)}>
                    <Controller
                        control={controlUpdateSecurity}
                        name="oldPassword"
                        render={({ field }) => (
                            <Input
                                {...field}
                                labelPlacement="outside"
                                label="Old Password"
                                variant="bordered"
                                placeholder="Input old password"
                                type="password"
                                isInvalid={errorsUpdateSecurity.oldPassword !== undefined}
                                errorMessage={errorsUpdateSecurity.oldPassword?.message}
                            />
                        )} />
                    <Controller
                        control={controlUpdateSecurity}
                        name="password"
                        render={({ field }) => (
                            <Input
                                {...field}
                                labelPlacement="outside"
                                label="New Password"
                                variant="bordered"
                                placeholder="Input new password"
                                type="password"
                                isInvalid={errorsUpdateSecurity.password !== undefined}
                                errorMessage={errorsUpdateSecurity.password?.message}
                            />
                        )} />
                    <Controller
                        control={controlUpdateSecurity}
                        name="confirmPassword"
                        render={({ field }) => (
                            <Input
                                {...field}
                                labelPlacement="outside"
                                label="New Password Confirmation"
                                variant="bordered"
                                placeholder="Input confirmation password"
                                type="password"
                                isInvalid={errorsUpdateSecurity.confirmPassword !== undefined}
                                errorMessage={errorsUpdateSecurity.confirmPassword?.message}
                            />
                        )} />
                    <Button color="primary"
                        className="mt-2 disabled:bg-default-500"
                        type="submit"
                        disabled={isPendingUpdatePassword}>
                        {isPendingUpdatePassword ? <Spinner size="sm" color="white" variant="wave" /> : "Update Password"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default SecurityTab;