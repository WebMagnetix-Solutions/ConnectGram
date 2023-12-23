import { api } from "../../api_call"
import { getPostUniqueId } from "../Helper/Helper"

export const createPost = async (formData) => {
    try {
        const { data } = await api.post(`/post/create`, formData , {
            headers: {
                "Content-Type": "multi-part/formdata"
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

export const getAllPosts = async () => {
    try {
        const { data } = await api.get(`/post/get-all-posts`)
        return data.result
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}

export const getSinglePost = async (post_id) => {
    try {
        const { data } = await api.get(`/post/single/${post_id}`)
        return data
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}

export const getFollowingPost = async (id) => {
    try {
        const { data } = await api.get(`/post/get-following-post/${id}`)
        return data
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}

export const getMyPosts = async (id) => {
    try {
        const { data } = await api.get(`/post/get-my-posts/${id}`)
        return data
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}

export const getUserPostByUsername = async (username) => {
    try {
        const { data } = await api.get(`/post/get-post-by-username?username=${username}`)
        return data
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}

export const getSavedPosts = async (id) => {
    try {
        const { data } = await api.get(`/post/saved/${id}`)
        return data
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}

export const likeOrDislike = async (post_id, user_id) => {
    try {
        const { data } = await api.patch(`/post/like`, { post_id, user_id })
        return data.result
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}

export const commentLikeOrDislike = async (comment_id, user_id) => {
    try {
        const { data } = await api.patch(`/post/comment/like`, { comment_id, user_id })
        return data.result
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}

export const saveOrUnSave = async (post_id, user_id) => {
    try {
        const { data } = await api.patch(`/post/save`, { post_id, user_id })
        return data.result
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}

export const deletePost = async (post_id, url, type) => {
    try {
        const id = getPostUniqueId(url)
        const { data } = await api.delete(`/post/delete/${type}/${post_id}/${id}`)
        return data
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}

export const getComments = async (post_id) => {
    try {
        const { data } = await api.get(`/post/comments/${post_id}`)
        return data
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}

export const addComment = async (formData) => {
    try {
        const { data } = await api.post(`/post/add-comment`, formData)
        return data
    } catch (err) {
        if(err.response.status===401){
            return 401
        }
        return err.response.data.message
    }
}