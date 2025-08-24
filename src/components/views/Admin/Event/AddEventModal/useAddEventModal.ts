import { DELAY } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { DateValue } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLocalTimeZone, now } from "@internationalized/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input event name"),
  slug: yup.string().required("Please input slug"),
  category: yup.string().required("Please select category"),
  startDate: yup.mixed<DateValue>().required("Please select start date"),
  endDate: yup.mixed<DateValue>().required("Please select end date"),
  isPublished: yup.string().required("Please select status"),
  isFeatured: yup.string().required("Please select featured"),
  description: yup.string().required("Please input description"),
  isOnline: yup.string().required("Please select online or offline"),
  region: yup.string().required("Please select region"),
  latitude: yup.string().required("Please input latitude coordinate"),
  longitude: yup.string().required("Please input longitude coordinate"),
  banner: yup.mixed<FileList | string>().required("Please add banner"),
});

const useAddEventModal = () => {
  const router = useRouter();
  const debounce = useDebounce();
  const {
    isPendingMutateUploadFile,
    isPendingMutateRemoveFile,
    handleRemoveFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("banner");
  const fileUrl = getValues("banner");
  setValue("startDate", now(getLocalTimeZone()));
  setValue("endDate", now(getLocalTimeZone()));

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("banner", fileUrl);
      }
    });
  };

  const handleRemoveBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleRemoveFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleRemoveFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: true,
  });

  const [searchRegency, setSearchRegency] = useState("");

  const { data: dataRegion } = useQuery({
    queryKey: ["region", searchRegency],
    queryFn: () => eventServices.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  const addEvent = async (payload: IEvent) => {
    const res = await eventServices.addEvent(payload);
    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingMutateAddEvent,
    isSuccess: isSuccessMutateAddEvent,
  } = useMutation({
    mutationFn: addEvent,
    onError: (err) => {
      addToast({
        title: "Failed",
        description: err.message,
        color: "danger",
        timeout: 3000,
      });
    },
    onSuccess: () => {
      addToast({
        title: "Success!",
        description: "Added new event",
        color: "success",
        timeout: 3000,
      });
    },
  });

  const handleAddEvent = (data: IEventForm) => {
    const payload = {
      ...data,
      isFeatured: Boolean(data.isFeatured),
      isPublished: Boolean(data.isPublished),
      isOnline: Boolean(data.isOnline),
      startDate: toDateStandard(data.startDate),
      endDate: toDateStandard(data.endDate),
      location: {
        region: data.region,
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
      banner: data.banner,
    };
    mutateAddEvent(payload);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddEvent,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    handleUploadBanner,
    isPendingMutateUploadFile,
    preview,
    handleRemoveBanner,
    isPendingMutateRemoveFile,
    handleOnClose,
    dataCategory,
    dataRegion,
    searchRegency,
    handleSearchRegion,
  };
};

export default useAddEventModal;
