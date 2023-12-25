import { api } from "../../api_call"
import { regex } from "../Helper/Helper"

export const userLogin = async ({username, password}) => {
    try {
        if (!username && !password) {
            return "Fields are empty"
        }
        if (!username) {
            return 'Username is empty'
        }
        if (! regex.username.test(username)) {
            return "Invalid username"    
        }
        if (!password) {
            return 'Password is empty'
        }
        if (!regex.password.test(password)) {
            return "Invalid Password"    
        } 
        const { data } = await api.get(`/user/login?username=${username}&password=${password}`)
        return data
    } catch (err) {
        return { message : err?.response?.data?.message || err.message} 
    }
}

export const userList = async (prefix=null) => {
    try {
        const { data } = await api.get(`/user/users?prefix=${prefix}`)
        return data
    } catch (err) {
        return { message : err?.response?.data?.message || err.message} 
    }
}

export const userSignup = async (userData) => {
    try {
        const {name, username, email, password, confirm_password} = userData
        for (const key in userData) {
            if (!userData[key]) {
                if (key === "confirm_password") {
                    return "Confirm password is empty"
                }
                return key.replace(key[0], key[0].toUpperCase())+" is empty"
            }
        }
        if (! regex.name.test(name)) {
            return "Invalid name"    
        }
        if (! regex.username.test(username)) {
            return "Invalid username"    
        }
        if (! regex.email.test(email)) {
            return "Invalid email"    
        }
        if (! regex.password.test(password)) {
            return "Invalid password"    
        }
        if (password !== confirm_password) {
            return "Password does not match"
        }
        const { data } = await api.post(`/user/signup`, userData)
        return data
    } catch (err) {
        return { message : err?.response?.data?.message || err.message} 
    }
}

export const getMe = async (id) => {
    try {
        const { data } = await api.get(`/user/getMe/${id}`)
        return data
    } catch (err) {
        return { message : err?.response?.data?.message || err.message} 
    }
}

export const getUserByUsername = async (username) => {
    try {
        const { data } = await api.get(`/user/user?username=${username}`)
        return data
    } catch (err) {
        return { message : err?.response?.data?.message || err.message} 
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
        return { message : err?.response?.data?.message || err.message} 
    }
}

export const suggestUsers = async (user_id) => {
    try {
        const { data } = await api.get(`/user/suggestions/${user_id}`)
        return data
    } catch (err) {
        return { message : err?.response?.data?.message || err.message} 
    }
}

export const followOrUnfollow = async (user_id, to_id) => {
    try {
        const { data } = await api.patch(`/user/follow`, {user_id, to_id})
        return data
    } catch (err) {
        return { message : err?.response?.data?.message || err.message} 
    }
}

export const getFollowers = async (user_id) => {
    try {
        const { data } = await api.get(`/user/get/followers/${user_id}`)
        return data
    } catch (err) {
        return { message : err?.response?.data?.message || err.message} 
    }
}

export const getFollowings = async (user_id) => {
    try {
        const { data } = await api.get(`/user/get/followings/${user_id}`)
        return data
    } catch (err) {
        return { message : err?.response?.data?.message || err.message} 
    }
}