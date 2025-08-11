import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { register } from "module";
import { IActivation, ILogin, IRegister } from "@/types/Auth";

const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
  login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),
  getProfileWithToken: (token: string) =>
    instance.get(`${endpoint.AUTH}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  activation: (payload: IActivation) =>
    instance.post(`${endpoint.AUTH}/activation`, payload),
};

export default authServices;
