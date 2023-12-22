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