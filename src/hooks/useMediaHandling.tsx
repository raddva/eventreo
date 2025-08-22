import uploadServices from "@/services/upload.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useMediaHandling = () => {
    const uploadIcon = async (file: File, callback: (fileUrl: string) => void) => {
        const formData = new FormData();
        formData.append("file", file);
        const {
            data: {
                data: { secure_url: icon },
            },
        } = await uploadServices.uploadFile(formData);
        callback(icon);
    }

    const { mutate: mutateUploadFile, isPending: isPendingMutateUploadFile } =
        useMutation({
            mutationFn: (variables: {
                file: File;
                callback: (fileUrl: string) => void
            }) => uploadIcon(variables.file, variables.callback),
            onError: (err) => {
                addToast({
                    title: "Failed",
                    description: err.message,
                    color: "danger",
                    timeout: 3000,
                });
            },
        });

    const removeIcon = async (fileUrl: string, callback: () => void) => {
        const res = await uploadServices.removeFile({ fileUrl });
        if (res.data.meta.status === 200) {
            callback();
        }
    }

    const { mutate: mutateRemoveFile, isPending: isPendingMutateRemoveFile } =
        useMutation({
            mutationFn: (variables: {
                fileUrl: string;
                callback: () => void
            }) => removeIcon(variables.fileUrl, variables.callback),
            onError: (err) => {
                addToast({
                    title: "Failed",
                    description: err.message,
                    color: "danger",
                    timeout: 3000,
                });
            },
        });

    return {
        mutateUploadFile,
        isPendingMutateUploadFile,
        mutateRemoveFile,
        isPendingMutateRemoveFile
    }
}

export default useMediaHandling;