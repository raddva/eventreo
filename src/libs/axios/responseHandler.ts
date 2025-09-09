import { AxiosError } from "axios";
import { signOut } from "next-auth/react";

interface ErrorResponseData {
  data: {
    name: string;
  };
}

const onErrorHandler = (error: Error) => {
  const { response } = error as AxiosError;
  const res = response?.data as ErrorResponseData;
  if (res?.data?.name === "TokenExpiredError") {
    signOut();
  }
};

export { onErrorHandler };
