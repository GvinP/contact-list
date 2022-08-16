import axios, { AxiosResponse } from 'axios'
import { FormDataType } from '../components/Login/Login'

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
})

instance.interceptors.request.use((req) => {
    if (req.headers) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')||'{}').token}`
    }
    return req
})

export const api = {
    getContacts(page: number) {
        return instance.get<ResponseType<ContactType[]>>(`contacts?page=${page}`).then(res=>res.data);
    },
    getContact(id: string) {
        return instance.get(`contacts/${id}`)
    },
    addContact(contact: ContactType) {
        return instance.post('contacts', contact)
    },
    updateContact(id: string, contact: ContactType) {
        return instance.patch(`contacts/${id}`, contact)
    },
    deleteContact(id: string) {
        return instance.delete(`contacts/${id}`)
    },
    likeContact(id: string) {
        return instance.patch(`contacts/${id}/like`)
    },
    searchContacts(search: string) {
        return instance.get(`contacts/search?searchQuery=${search || 'none'}`)
    },
}

export const authApi = {
    registration(formData: FormDataType) {
        return instance.post('user/registration', formData)
    },
    login(formData: FormDataType) {
        return instance.post('user/login', formData)
    }
}

  
  export type ContactType = {
    firstName: string
    lastName: string
    email: string
    phone: string
    adress: string
    photo: string
  }

export type ResponseType<D = {}> = {
    currentPage: number | null
    totalPagesCount: number | null
    data: D
}