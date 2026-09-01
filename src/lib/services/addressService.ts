import { api } from "./api";
export type Address = { _id: string; name: string; details: string; phone: string; city: string };
export const getAddresses = (token: string) => api<{ data: Address[] }>("/addresses", {}, token);
export const getAddress = (token: string, id: string) => api<{ data: Address }>(`/addresses/${id}`, {}, token);
export const addAddress = (token: string, address: Omit<Address, "_id">) => api<{ data: Address[] }>("/addresses", { method: "POST", body: JSON.stringify(address) }, token);
export const deleteAddress = (token: string, id: string) => api<{ data: Address[] }>(`/addresses/${id}`, { method: "DELETE" }, token);
