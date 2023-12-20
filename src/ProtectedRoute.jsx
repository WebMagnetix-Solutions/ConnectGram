import { Navigate} from "react-router-dom"
import { getAuth } from "./Auth"

export const Authentication = ({ children, login, register }) => {

    const auth = getAuth()

    if (auth) {
        if (login || register) {
            return <Navigate to={"/"} />
        } else {
            return children
        }
    } else {
        if (login || register) {
            return children
        } else {
            return <Navigate to={"/login"} />
        }
    }
    
}