import axios from "axios"
import { getAuth } from "./Auth"

export const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER
})

api.interceptors.request.use((config) => {
    const access_token = getAuth()
    config.headers.Authorization = `Barear ${access_token}`
    return config
})