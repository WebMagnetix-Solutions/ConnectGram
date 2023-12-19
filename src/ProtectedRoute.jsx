import { useNavigate } from "react-router-dom"
import { getAuth } from "./Auth"

export const Authentication = ({ children, login, register }) => {

    const auth = getAuth()
    const navigate = useNavigate()

    if (auth) {
        if (login || register) {
            return navigate("/")
        } else {
            return children
        }
    } else {
        if (login || register) {
            return children
        } else {
            return navigate("/login")
        }
    }
    
}