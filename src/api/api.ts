import axios, { AxiosResponse } from "axios";
import { FormDataType } from "../components/Login/Login";

const instance = axios.create({
  baseURL: "https://contact-list-server-test.herokuapp.com/",
});

instance.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers!.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user") || "{}").token
    }`;
  }
  return req;
});

export const api = {
  getContacts(page: number) {
    return instance
      .get<ResponseType<ContactType[]>>(`contacts?page=${page}`)
      .then((res) => res.data);
  },
  getContact(id: string) {
    return instance.get<AxiosResponse<ContactType>>(`contacts/${id}`);
  },
  addContact(contact: ContactType) {
    return instance.post<ContactType, AxiosResponse<ContactType>>(
      "contacts",
      contact
    );
  },
  updateContact(id: string, contact: ContactType) {
    return instance.patch<
      { id: string; contact: ContactType },
      AxiosResponse<ContactType>
    >(`contacts/${id}`, contact);
  },
  deleteContact(id: string) {
    return instance.delete<AxiosResponse<{ message: string }>>(
      `contacts/${id}`
    );
  },
  searchContacts(search: string) {
    return instance.get<ContactType[]>(
      `contacts/search?searchQuery=${search || "none"}`
    );
  },
};

export const authApi = {
  registration(formData: FormDataType) {
    return instance.post<FormDataType, AxiosResponse<AuthDataType>>(
      "user/registration",
      formData
    );
  },
  login(formData: FormDataType) {
    return instance.post<FormDataType, AxiosResponse<AuthDataType>>(
      "user/login",
      formData
    );
  },
};

export type AuthType = {
  id: string;
  name: string;
  email: string;
};

export type AuthDataType = {
  result: AuthType | null;
  token: string;
};

export type ContactType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adress: string;
  photo: string;
  _id?: string;
};

export type ResponseType<D = {}> = {
  currentPage: number | null;
  totalPagesCount: number | null;
  data: D;
};
