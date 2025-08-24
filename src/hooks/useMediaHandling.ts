import uploadServices from "@/services/upload.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useMediaHandling = () => {
  const uploadFile = async (
    file: File,
    callback: (fileUrl: string) => void,
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    const {
      data: {
        data: { secure_url: fileUrl },
      },
    } = await uploadServices.uploadFile(formData);
    callback(fileUrl);
  };

  const { mutate: mutateUploadFile, isPending: isPendingMutateUploadFile } =
    useMutation({
      mutationFn: (variables: {
        file: File;
        callback: (fileUrl: string) => void;
      }) => uploadFile(variables.file, variables.callback),
      onError: (err) => {
        addToast({
          title: "Failed",
          description: err.message,
          color: "danger",
          timeout: 3000,
        });
      },
    });

  const removeFile = async (fileUrl: string, callback: () => void) => {
    const res = await uploadServices.removeFile({ fileUrl });
    if (res.data.meta.status === 200) {
      callback();
    }
  };

  const { mutate: mutateRemoveFile, isPending: isPendingMutateRemoveFile } =
    useMutation({
      mutationFn: (variables: { fileUrl: string; callback: () => void }) =>
        removeFile(variables.fileUrl, variables.callback),
      onError: (err) => {
        addToast({
          title: "Failed",
          description: err.message,
          color: "danger",
          timeout: 3000,
        });
      },
    });

  const handleUploadFile = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
    callback: (fileUrl?: string) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback: callback,
      });
    }
  };

  const handleRemoveFile = (
    fileUrl: string | FileList | undefined,
    callback: () => void,
  ) => {
    if (typeof fileUrl === "string") {
      mutateRemoveFile({ fileUrl, callback });
    } else {
      callback();
    }
  };

  return {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateRemoveFile,
    isPendingMutateRemoveFile,
    handleUploadFile,
    handleRemoveFile,
  };
};

export default useMediaHandling;
