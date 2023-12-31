import { api } from "../../api_call"

export const createChat = async (user_id, to_id) => {
    try {
        const { data } = await api.post(`/chat/chat`, { user_id, to_id })
        return data
    } catch (err) {
        return { message : err?.response?.data?.message || err.message} 
    }
}

export const getChatList = async (user_id, search="") => {
    try {
        const { data } = await api.get(`/chat/chats/${user_id}?search=${search}`)
        return data
    } catch (err) {
        return { message : err?.response?.data?.message || err.message} 
    }
}

export const getAllMessages = async (chat_id) => {
    try {
        const { data } = await api.get(`/chat/messages/${chat_id}`)
        return data
    } catch (err) {
        return { message : err?.response?.data?.message || err.message} 
    }
}

export const sendMessgae = async (messageData) => {
    try {
        const { data } = await api.post(`/chat/sendMessage`, {messageData})
        return data
    } catch (err) {
        return { message : err?.response?.data?.message || err.message} 
    }
}