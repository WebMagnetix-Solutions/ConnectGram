/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { createSocket } from "../Utils/Helper/Helper";

const MyContext = createContext()

export const MyProvider = ({ children }) => {
    
    let socket = createSocket()

    return (
        <MyContext.Provider value={{ socket }}>
            {children}
        </MyContext.Provider>
    )

}

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
    return useContext(MyContext)
} 