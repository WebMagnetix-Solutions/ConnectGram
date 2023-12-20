import { api } from "../../api_call"

export const createPost = async (formData) => {
    try {
        const { data } = await api.post(`/post/create`, formData , {
            headers: {
                "Content-Type": "multi-part/formdata"
            }
        })
        return data
    } catch (err) {
        return err.response.data.message
    }
}

export const getAllPosts = async () => {
    try {
        const { data } = await api.get(`/post/get-all-posts`)
        return data.result
    } catch (err) {
        return err.response.data.message
    }
}

export const getMyPosts = async (id) => {
    try {
        const { data } = await api.get(`/post/get-my-posts/${id}`)
        return data.result
    } catch (err) {
        return err.response.data.message
    }
}