import InputFile from "@/components/ui/InputFile";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Skeleton } from "@heroui/skeleton";
import Image from "next/image";
import useImageTab from "./useImageTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { Spinner } from "@heroui/spinner";
import { IBanner } from "@/types/Banner";

interface PropTypes {
    currentImage: string;
    onUpdate: (data: IBanner) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const ImageTab = (props: PropTypes) => {
    const { currentImage, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
    const {
        controlUpdateImage,
        errorsUpdateImage,
        handleRemoveImage,
        handleUploadImage,
        handleSubmitUpdateImage,
        resetUpdateImage,

        preview,
        isPendingMutateRemoveFile,
        isPendingMutateUploadFile,
    } = useImageTab();

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateImage();
        }
    }, [isSuccessUpdate]);

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="w-full text-xl font-bold">Banner Image</h1>
                <p className="text-small text-default-400 w-full">Manage image of this category</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateImage(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Image</p>
                        <Skeleton isLoaded={!!currentImage} className="aspect-square rounded-lg">
                            <Image src={currentImage} alt="Image" fill className="!relative" />
                        </Skeleton>
                    </div>
                    <Controller
                        control={controlUpdateImage}
                        name="image"
                        render={({ field: { onChange, value, ...field } }) => (
                            <InputFile {...field}
                                onRemove={() => handleRemoveImage(onChange)}
                                onUpload={(files) => handleUploadImage(files, onChange)}
                                isUploading={isPendingMutateUploadFile}
                                isRemoving={isPendingMutateRemoveFile}
                                isInvalid={errorsUpdateImage.image !== undefined}
                                errorMessage={errorsUpdateImage.image?.message}
                                isDropable
                                label={<p className="mb-2 text-sm font-medium text-default-700">Upload New Image</p>}
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

export default ImageTab;