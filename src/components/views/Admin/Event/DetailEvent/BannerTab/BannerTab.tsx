import InputFile from "@/components/ui/InputFile";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Skeleton } from "@heroui/skeleton";
import Image from "next/image";
import useBannerTab from "./useBannerTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { Spinner } from "@heroui/spinner";
import { IEvent } from "@/types/Event";

interface PropTypes {
    currentBanner: string;
    onUpdate: (data: IEvent) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const BannerTab = (props: PropTypes) => {
    const { currentBanner, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
    const {
        controlUpdateBanner,
        errorsUpdateBanner,
        handleRemoveBanner,
        handleUploadBanner,
        handleSubmitUpdateBanner,
        resetUpdateBanner,

        preview,
        isPendingMutateRemoveFile,
        isPendingMutateUploadFile,
    } = useBannerTab();

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateBanner();
        }
    }, [isSuccessUpdate]);

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="w-full text-xl font-bold">Event  Banner</h1>
                <p className="text-small text-default-400 w-full">Manage banner of this category</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateBanner(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Banner</p>
                        <Skeleton isLoaded={!!currentBanner} className="aspect-video rounded-lg">
                            <Image src={currentBanner} alt="Banner" fill className="!relative" />
                        </Skeleton>
                    </div>
                    <Controller
                        control={controlUpdateBanner}
                        name="banner"
                        render={({ field: { onChange, value, ...field } }) => (
                            <InputFile {...field}
                                onRemove={() => handleRemoveBanner(onChange)}
                                onUpload={(files) => handleUploadBanner(files, onChange)}
                                isUploading={isPendingMutateUploadFile}
                                isRemoving={isPendingMutateRemoveFile}
                                isInvalid={errorsUpdateBanner.banner !== undefined}
                                errorMessage={errorsUpdateBanner.banner?.message}
                                isDropable
                                label={<p className="mb-2 text-sm font-medium text-default-700">Upload New Banner</p>}
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

export default BannerTab;