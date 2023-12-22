import { api } from "../../api_call"

export const userLogin = async ({username, password}) => {
    try {
        const { data } = await api.get(`/user/login?username=${username}&password=${password}`)
        return data
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}

export const userList = async (prefix=null) => {
    try {
        const { data } = await api.get(`/user/users?prefix=${prefix}`)
        return data
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}

export const userSignup = async (userData) => {
    try {
        const { data } = await api.post(`/user/signup`, userData)
        return data
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}

export const getMe = async (id) => {
    try {
        const { data } = await api.get(`/user/getMe/${id}`)
        return data
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}

export const profileEdit = async (formData) => {
    try {
        const { data } = await api.patch(`/user/profile/edit`, formData, {
            headers: {
                "Content-Type": "multi-part/form-data"
            }
        })
        return data
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}

export const suggestUsers = async (user_id) => {
    try {
        const { data } = await api.get(`/user/suggestions/${user_id}`)
        return data
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}

export const followOrUnfollow = async (user_id, to_id) => {
    try {
        const { data } = await api.patch(`/user/follow`, {user_id, to_id})
        return data
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}