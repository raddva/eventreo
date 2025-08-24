import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IEvent } from "@/types/Event";

const eventServices = {
  getEvents: (params?: string) => instance.get(`${endpoint.EVENT}?${params}`),
  getEventById: (id: string) => instance.get(`${endpoint.EVENT}/${id}`),
  addEvent: (payload: IEvent) => instance.post(endpoint.EVENT, payload),
  removeEvent: (id: string) => instance.delete(`${endpoint.EVENT}/${id}`),
  updateEvent: (id: string, payload: IEvent) =>
    instance.put(`${endpoint.EVENT}/${id}`, payload),
};

export default eventServices;
