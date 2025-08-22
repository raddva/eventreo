import { cn } from "@/utils/cn";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import Image from "next/image";
import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { CiSaveUp2, CiTrash } from "react-icons/ci";

interface PropTypes {
    name: string;
    isDropable?: boolean;
    className?: string;
    // onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onUpload?: (files: FileList) => void;
    onRemove?: () => void;
    isUploading?: boolean;
    isRemoving?: boolean;
    isInvalid?: boolean;
    preview?: string;
    errorMessage?: string;
}

const InputFile = (props: PropTypes) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const {
        name,
        isDropable = false,
        className,
        // onChange,
        isInvalid,
        errorMessage,
        onUpload,
        onRemove,
        isRemoving,
        isUploading,
        preview
    } = props;
    const drop = useRef<HTMLLabelElement>(null);
    const dropZoneId = useId();

    const handleDragEnter = (e: DragEvent) => {
        if (isDropable) {
            e.preventDefault();
            e.stopPropagation();
            setIsDragOver(true);
        }
    }

    const handleDragOver = (e: DragEvent) => {
        if (isDropable) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    const handleDragLeave = (e: DragEvent) => {
        if (isDropable) {
            e.preventDefault();
            e.stopPropagation();
            setIsDragOver(false);
        }
    }

    const handleDrop = (e: DragEvent) => {
        if (isDropable) {
            e.preventDefault();
            // e.stopPropagation();
            // setIsDragOver(false);

            // const files = e.dataTransfer?.files;
            // if (files && files.length > 0) {
            //     setUploadedImage(files[0]);
            // }
            const files = e.dataTransfer?.files;
            if (files && onUpload) {
                onUpload(files);
            }
        }
    }

    useEffect(() => {
        const dropCurrent = drop.current;
        if (dropCurrent && isDropable) {
            dropCurrent.addEventListener("dragenter", handleDragEnter);
            dropCurrent.addEventListener("dragover", handleDragOver);
            dropCurrent.addEventListener("dragleave", handleDragLeave);
            dropCurrent.addEventListener("drop", handleDrop);

            return () => {
                dropCurrent.removeEventListener("dragenter", handleDragEnter);
                dropCurrent.removeEventListener("dragover", handleDragOver);
                dropCurrent.removeEventListener("dragleave", handleDragLeave);
                dropCurrent.removeEventListener("drop", handleDrop);
            }
        }
    }, [isDropable]);

    const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files && onUpload) {
            onUpload(files);
        }
    }

    return (
        <div>
            <label
                ref={drop}
                htmlFor={`dropzone-file-${dropZoneId}`}
                className={cn(
                    "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
                    isDragOver && "border-blue-400 bg-blue-50",
                    className,
                    { "border-danger-500": isInvalid }
                )
                }>
                {preview && (
                    <div className="relative flex flex-col items-center justify-center p-5" >
                        <div className="mb-2 w-1/2">
                            <Image fill
                                src={preview}
                                alt="Image"
                                className="!relative"
                            />
                        </div>
                        <Button isIconOnly className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded bg-danger-100"
                            onPress={onRemove}
                            disabled={isRemoving}>
                            {isRemoving ? (<Spinner size="sm" color="danger" variant="spinner" />) : (<CiTrash className="h-5 w-5 text-danger-500" />)}
                        </Button>
                    </div>
                )}
                {!preview && !isUploading && (
                    <div className="flex flex-col items-center justify-center p-5">
                        <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />
                        {isDropable ? "Drag and drop or click here to upload file" : "Click here to upload file"}
                    </div>
                )}

                {isUploading && (
                    <div className="flex flex-col items-center justify-center p-5">
                        <Spinner color="primary" />
                    </div>
                )}
                <input
                    type="file"
                    name={name}
                    className="hidden"
                    accept="image/*"
                    id={`dropzone-file-${dropZoneId}`}
                    onChange={handleOnUpload}
                    disabled={preview !== ""}
                    onClick={
                        (e) => {
                            e.currentTarget.value = "";
                            e.target.dispatchEvent(new Event("change", { bubbles: true }));
                        }
                    }
                />
            </label >
            {isInvalid && (
                <p className="p-1 text-xs text-danger-500">{errorMessage}</p>
            )}
        </div >
    )
}

export default InputFile;