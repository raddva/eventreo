import InputFile from "@/components/ui/InputFile";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Skeleton } from "@heroui/skeleton";
import usePictureTab from "./usePictureTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { Spinner } from "@heroui/spinner";
import { IProfile } from "@/types/Auth";
import { Avatar } from "@heroui/react";

interface PropTypes {
    currentPicture: string;
    onUpdate: (data: IProfile) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const PictureTab = (props: PropTypes) => {
    const { currentPicture, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
    const {
        controlUpdatePicture,
        errorsUpdatePicture,
        handleRemovePicture,
        handleUploadPicture,
        handleSubmitUpdatePicture,
        resetUpdatePicture,

        preview,
        isPendingMutateRemoveFile,
        isPendingMutateUploadFile,
    } = usePictureTab();

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdatePicture();
        }
    }, [isSuccessUpdate]);

    return (
        <Card className="w-full p-4 lg:w-1/3">
            <CardHeader className="flex-col items-center">
                <h1 className="w-full text-xl font-bold">Event  Picture</h1>
                <p className="text-small text-default-400 w-full">Manage Profile Picture for your Account</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdatePicture(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Picture</p>
                        <Skeleton isLoaded={!!currentPicture} className="aspect-square w-full rounded-lg">
                            <Avatar src={currentPicture} alt="Picture" showFallback className="aspect-square w-full h-full" />
                        </Skeleton>
                    </div>
                    <Controller
                        control={controlUpdatePicture}
                        name="profilePicture"
                        render={({ field: { onChange, value, ...field } }) => (
                            <InputFile {...field}
                                onRemove={() => handleRemovePicture(onChange)}
                                onUpload={(files) => handleUploadPicture(files, onChange)}
                                isUploading={isPendingMutateUploadFile}
                                isRemoving={isPendingMutateRemoveFile}
                                isInvalid={errorsUpdatePicture.profilePicture !== undefined}
                                errorMessage={errorsUpdatePicture.profilePicture?.message}
                                isDropable
                                label={<p className="mb-2 text-sm font-medium text-default-700">Upload New Picture</p>}
                                preview={typeof preview == "string" ? preview : ""}
                            />
                        )} />
                    <Button color="primary"
                        className="mt-2 disabled:bg-default-500"
                        type="submit"
                        disabled={isPendingUpdate || isPendingMutateUploadFile || !preview}>
                        {isPendingUpdate ? <Spinner size="sm" color="white" variant="wave" /> : "Save Changes"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default PictureTab;