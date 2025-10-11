import authServices from "@/services/auth.service";
import { IUpdatePassword } from "@/types/Auth";
import { addToast, Toast } from "@heroui/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { error } from "console";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateSecurity = yup.object().shape({
  oldPassword: yup.string().required("Please input your old password"),
  password: yup.string().required("Please input new password"),
  confirmPassword: yup.string().required("Please input confirmation password"),
});

const useSecurityTab = () => {
  const {
    control: controlUpdateSecurity,
    handleSubmit: handleSubmitUpdateSecurity,
    formState: { errors: errorsUpdateSecurity },
    reset: resetUpdateSecurity,
    setValue: setValueUpdateSecurity,
  } = useForm({
    resolver: yupResolver(schemaUpdateSecurity),
  });

  const updatePassword = async (payload: IUpdatePassword) => {
    const { data } = await authServices.updatePassword(payload);
    return data;
  };

  const { mutate: mutateUpdatePassword, isPending: isPendingUpdatePassword } =
    useMutation({
      mutationFn: (payload: IUpdatePassword) => updatePassword(payload),
      onError: (err) => {
        addToast({
          title: "Failed",
          description: err.message,
          color: "danger",
          timeout: 3000,
        });
      },
      onSuccess: () => {
        resetUpdateSecurity();
        setValueUpdateSecurity("oldPassword", "");
        setValueUpdateSecurity("password", "");
        setValueUpdateSecurity("confirmPassword", "");
        addToast({
          title: "Success!",
          description: "Updated password successfully",
          color: "success",
          timeout: 3000,
        });
      },
    });

  const handleUpdatePassword = (data: IUpdatePassword) =>
    mutateUpdatePassword(data);

  return {
    controlUpdateSecurity,
    errorsUpdateSecurity,
    handleSubmitUpdateSecurity,
    resetUpdateSecurity,
    setValueUpdateSecurity,

    isPendingUpdatePassword,
    handleUpdatePassword,
  };
};

export default useSecurityTab;
