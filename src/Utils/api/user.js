import { api } from "../../api_call"

export const userLogin = async ({username, password}) => {
    try {
        const { data } = await api.get(`/user/login?username=${username}&password=${password}`)
        return data
    } catch (err) {
        return err.response.data.message
    }
}

export const userSignup = async (userData) => {
    try {
        const { data } = await api.post(`/user/signup`, userData)
        return data
    } catch (err) {
        return err.response.data.message
    }
}