export const getAuth = () => {
    const access_token = localStorage.getItem("__access_token__")
    if (access_token) {
        return true
    } else {
        return false
    }
}

export const setAuth = (access_token) => {
    return localStorage.setItem("__access_token__", access_token)
}

export const removeAuth = () => {
    return localStorage.removeItem("__access_token__")
}