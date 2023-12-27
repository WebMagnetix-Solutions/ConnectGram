export const getAuth = () => {
    const access_token = localStorage.getItem("_access_token_")
    if (access_token) {
        return access_token
    } else {
        return false
    }
}

export const getMyData = () => {
    const user = localStorage.getItem("_user_")
    return user ? JSON.parse(user) : null
}

export const setAuth = (access_token, user) => {
    localStorage.setItem("_access_token_", access_token)
    localStorage.setItem("_user_", JSON.stringify(user))
}

export const removeAuth = () => {
    localStorage.removeItem("_access_token_")
    localStorage.removeItem("_user_")
}