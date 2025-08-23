import InputFile from "@/components/ui/InputFile";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Skeleton } from "@heroui/skeleton";
import Image from "next/image";
import useIconTab from "./useIconTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { Spinner } from "@heroui/spinner";
import { ICategory } from "@/types/Category";

interface PropTypes {
    currentIcon: string;
    onUpdate: (data: ICategory) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const IconTab = (props: PropTypes) => {
    const { currentIcon, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
    const {
        controlUpdateIcon,
        errorsUpdateIcon,
        handleRemoveIcon,
        handleUploadIcon,
        handleSubmitUpdateIcon,
        resetUpdateIcon,

        preview,
        isPendingMutateRemoveFile,
        isPendingMutateUploadFile,
    } = useIconTab();

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateIcon();
        }
    }, [isSuccessUpdate]);

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="w-full text-xl font-bold">Category Icon</h1>
                <p className="text-small text-default-400 w-full">Manage icon of this category</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateIcon(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Icon</p>
                        <Skeleton isLoaded={!!currentIcon} className="aspect-square rounded-lg">
                            <Image src={currentIcon} alt="Icon" fill className="!relative" />
                        </Skeleton>
                    </div>
                    <Controller
                        control={controlUpdateIcon}
                        name="icon"
                        render={({ field: { onChange, value, ...field } }) => (
                            <InputFile {...field}
                                onRemove={() => handleRemoveIcon(onChange)}
                                onUpload={(files) => handleUploadIcon(files, onChange)}
                                isUploading={isPendingMutateUploadFile}
                                isRemoving={isPendingMutateRemoveFile}
                                isInvalid={errorsUpdateIcon.icon !== undefined}
                                errorMessage={errorsUpdateIcon.icon?.message}
                                isDropable
                                label={<p className="mb-2 text-sm font-medium text-default-700">Upload New Icon</p>}
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

export default IconTab;