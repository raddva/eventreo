import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdatePicture = yup.object().shape({
  profilePicture: yup
    .mixed<FileList | string>()
    .required("Please input a picture"),
});

const usePictureTab = () => {
  const {
    isPendingMutateUploadFile,
    isPendingMutateRemoveFile,
    handleRemoveFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control: controlUpdatePicture,
    handleSubmit: handleSubmitUpdatePicture,
    formState: { errors: errorsUpdatePicture },
    reset: resetUpdatePicture,
    watch: watchUpdatePicture,
    getValues: getValuesUpdatePicture,
    setValue: setValueUpdatePicture,
  } = useForm({
    resolver: yupResolver(schemaUpdatePicture),
  });

  const preview = watchUpdatePicture("profilePicture");
  const fileUrl = getValuesUpdatePicture("profilePicture");

  const handleUploadPicture = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdatePicture("profilePicture", fileUrl);
      }
    });
  };

  const handleRemovePicture = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleRemoveFile(fileUrl, () => onChange(undefined));
  };

  return {
    controlUpdatePicture,
    errorsUpdatePicture,
    resetUpdatePicture,
    setValueUpdatePicture,
    handleRemovePicture,
    handleUploadPicture,
    handleSubmitUpdatePicture,

    preview,
    isPendingMutateRemoveFile,
    isPendingMutateUploadFile,
  };
};

export default usePictureTab;
