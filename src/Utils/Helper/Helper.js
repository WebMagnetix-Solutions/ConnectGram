import moment from "moment";

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