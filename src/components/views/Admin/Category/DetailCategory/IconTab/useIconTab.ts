import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateIcon = yup.object().shape({
  icon: yup.mixed<FileList | string>().required("Please input category icon"),
});

const useIconTab = () => {
  const {
    isPendingMutateUploadFile,
    isPendingMutateRemoveFile,
    handleRemoveFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control: controlUpdateIcon,
    handleSubmit: handleSubmitUpdateIcon,
    formState: { errors: errorsUpdateIcon },
    reset: resetUpdateIcon,
    watch: watchUpdateIcon,
    getValues: getValuesUpdateIcon,
    setValue: setValueUpdateIcon,
  } = useForm({
    resolver: yupResolver(schemaUpdateIcon),
  });

  const preview = watchUpdateIcon("icon");
  const fileUrl = getValuesUpdateIcon("icon");

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdateIcon("icon", fileUrl);
      }
    });
  };

  const handleRemoveIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleRemoveFile(fileUrl, () => onChange(undefined));
  };

  return {
    controlUpdateIcon,
    errorsUpdateIcon,
    resetUpdateIcon,
    setValueUpdateIcon,
    handleRemoveIcon,
    handleUploadIcon,
    handleSubmitUpdateIcon,

    preview,
    isPendingMutateRemoveFile,
    isPendingMutateUploadFile,
  };
};

export default useIconTab;
