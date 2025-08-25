import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateBanner = yup.object().shape({
  banner: yup.mixed<FileList | string>().required("Please input event banner"),
});

const useBannerTab = () => {
  const {
    isPendingMutateUploadFile,
    isPendingMutateRemoveFile,
    handleRemoveFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control: controlUpdateBanner,
    handleSubmit: handleSubmitUpdateBanner,
    formState: { errors: errorsUpdateBanner },
    reset: resetUpdateBanner,
    watch: watchUpdateBanner,
    getValues: getValuesUpdateBanner,
    setValue: setValueUpdateBanner,
  } = useForm({
    resolver: yupResolver(schemaUpdateBanner),
  });

  const preview = watchUpdateBanner("banner");
  const fileUrl = getValuesUpdateBanner("banner");

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdateBanner("banner", fileUrl);
      }
    });
  };

  const handleRemoveBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleRemoveFile(fileUrl, () => onChange(undefined));
  };

  return {
    controlUpdateBanner,
    errorsUpdateBanner,
    resetUpdateBanner,
    setValueUpdateBanner,
    handleRemoveBanner,
    handleUploadBanner,
    handleSubmitUpdateBanner,

    preview,
    isPendingMutateRemoveFile,
    isPendingMutateUploadFile,
  };
};

export default useBannerTab;
