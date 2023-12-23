import moment from "moment";
import toast from "react-hot-toast";
import io from "socket.io-client"

export const getPostUniqueId = (cloudinaryURL) => {

    const urlComponents = cloudinaryURL.split('/');

    const lastComponent = urlComponents[urlComponents.length - 1];

    const uniqueID = lastComponent.split('.')[0];

    return uniqueID
}

export const getMoment = (date) => {
    const response = moment(date).fromNow(true)
    return `(${response})`
}

export const copyToClipboard = (text) => {
    toast.promise(navigator.clipboard.writeText(text), {
        loading: "Copying...",
        success: "Link Copied",
        error: "Copy failed!"
    })
}

export const createSocket = () => {
    return io(import.meta.env.VITE_SOCKET)
}

export const regex = {
    name: /^[a-zA-Z0-9 ]{4,16}$/,
    username: /^[a-z0-9_.]{4,13}$/,
    email: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,16}$/,
    password2: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,16}$/
} 

export const registerValidation = (key, value) => {
    if (key === "name") {
        if (!regex.name.test(value) && value.length > 0) {
            return {name: "Only upper case, Lower case, numeric, space and 4-16 characters allowded\n"}
        } else {
            return {name: null}
        }
    }
    if (key === "username") {
        if (!regex.username.test(value) && value.length > 0) {
            return {username: "Only Lower case, numeric, dot, underscore and 4-13 characters allowded"}
        } else {
            return {username: null}
        }
    }
    if (key === "email") {
        if (!regex.email.test(value) && value.length > 0) {
            return {email: "Invalid email format"}
        } else {
            return {email: null}
        }
    }
    if (key === "password") {
        if (!regex.password.test(value) && value.length > 0) {
            return {password: "Should contain upper, lower, numeric, special and 8-16 characters"}
        } else {
            return {password: null}
        }
    }
}