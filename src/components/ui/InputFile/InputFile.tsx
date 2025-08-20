import { cn } from "@/utils/cn";
import Image from "next/image";
import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";

interface PropTypes {
    name: string;
    isDropable?: boolean;
    className?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isInvalid?: boolean;
    errorMessage?: string;
}

const InputFile = (props: PropTypes) => {
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const { name, isDropable = false, className, onChange, isInvalid, errorMessage } = props;
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
            e.stopPropagation();
            setIsDragOver(false);

            const files = e.dataTransfer?.files;
            if (files && files.length > 0) {
                setUploadedImage(files[0]);
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

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files && files.length > 0) {
            setUploadedImage(files[0]);
            if (onChange) {
                onChange(e);
            }
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
                {
                    uploadedImage ? (
                        <div className="flex flex-col items-center justify-center p-5" >
                            <div className="mb-2 w-1/2">
                                <Image fill
                                    src={URL.createObjectURL(uploadedImage)}
                                    alt="Image"
                                    className="!relative"
                                />
                            </div>
                            <p className="text-center text-sm font-semibold text-gray-500"> {uploadedImage.name} </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-5">
                            <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />
                            {isDropable ? "Drag and drop or click here to upload file" : "Click here to upload file"}
                        </div>
                    )}
                <input
                    type="file"
                    name={name}
                    className="hidden"
                    accept="image/*"
                    id={`dropzone-file-${dropZoneId}`}
                    onChange={handleOnChange}
                />
            </label>
            {isInvalid && (
                <p className="p-1 text-xs text-danger-500">{errorMessage}</p>
            )}
        </div>
    )
}

export default InputFile;