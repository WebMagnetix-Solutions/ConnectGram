import { api } from "../../api_call"

export const createStory = async (formData) => {
    try {
        const { data } = await api.post(`/story/add/new`, formData, {
            headers: {
                "Content-Type": "multi-part/formdata"
            }
        })
        return data
    } catch (err) {
        return { message : err?.response?.data?.message || err.message} 
    }
}

export const getStories = async (user_id) => {
    try {
        const { data } = await api.get(`/story/get/stories/${user_id}`)
        return data
    } catch (err) {
        return { message : err?.response?.data?.message || err.message} 
    }
}

export const updateStoryView = async (story_id, user_id) => {
    try {
        const { data } = await api.patch(`/story/update/view`, {story_id, user_id})
        return data
    } catch (err) {
        return { message : err?.response?.data?.message || err.message} 
    }
}

export const deleteSingleStory = async (story_id, user_id) => {
    try {
        const { data } = await api.delete(`/story/delete/story/${story_id}/${user_id}`)
        return data
    } catch (err) {
        return { message : err?.response?.data?.message || err.message} 
    }
}