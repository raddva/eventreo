import categoryServices from "@/services/category.service";
import uploadServices from "@/services/upload.service";
import { ICategory, ICategoryForm } from "@/types/Category";
import { addToast } from "@heroui/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input category name"),
  description: yup.string().required("Please input category description"),
  icon: yup.mixed<FileList>().required("Please add icon"),
});

const useAddCategoryModal = () => {
  const uploadFile = async (payload: FormData) => {
    const data = await uploadServices.uploadFile(payload);
    return data;
  };

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const uploadIcon = async (data: ICategoryForm) => {
    const formData = new FormData();
    formData.append("file", data.icon[0]);
    const {
      data: {
        data: { secure_url: icon },
      },
    } = await uploadServices.uploadFile(formData);
    return { name: data.name, description: data.description, icon };
  };

  const addCategory = async (payload: ICategory) => {
    const res = await categoryServices.addCategory(payload);
    return res;
  };

  const {
    mutate: mutateAddCategory,
    isPending: isPendingMutateAddCategory,
    isSuccess: isSuccessMutateAddCategory,
  } = useMutation({
    mutationFn: addCategory,
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
        description: "Added new category",
        color: "success",
        timeout: 3000,
      });
    },
  });

  const { mutate: mutateAddFile, isPending: isPendingMutateAddFile } =
    useMutation({
      mutationFn: uploadIcon,
      onError: (err) => {
        addToast({
          title: "Failed",
          description: err.message,
          color: "danger",
          timeout: 3000,
        });
      },
      onSuccess: (payload) => {
        mutateAddCategory(payload);
      },
    });

  const handleAddCategory = (data: ICategoryForm) => mutateAddFile(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,
    isPendingMutateAddFile,
  };
};

export default useAddCategoryModal;
