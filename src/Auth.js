export const getAuth = () => {
    const access_token = localStorage.getItem("__access_token__")
    if (access_token) {
        return access_token
    } else {
        return false
    }
}

export const getMyData = () => {
    const user = localStorage.getItem("__user__")
    return user ? JSON.parse(user) : null
}

export const setAuth = (access_token, user) => {
    localStorage.setItem("__access_token__", access_token)
    localStorage.setItem("__user__", JSON.stringify(user))
}

export const removeAuth = () => {
    localStorage.removeItem("__access_token__")
    localStorage.removeItem("__user__")
}