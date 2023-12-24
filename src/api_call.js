import axios from "axios"
import { getAuth, removeAuth } from "./Auth"
import toast from "react-hot-toast"

export const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER
})

api.interceptors.request.use((config) => {
    const access_token = getAuth()
    config.headers.Authorization = `Barear ${access_token}`
    return config
})

api.interceptors.response.use((response) => {
    return response
}, ({response}) => {
    if (response.status === 500) {
        toast.error("Internal server error")
        setTimeout(() => {
            removeAuth()
            window.location.href = "/login"
        }, 1500);
    } else if(response.status === 401){
        toast.error("You have to re-login")
        setTimeout(() => {
            removeAuth()
            window.location.href = "/login"
        }, 1500);
    } else {
        return response
    }
})