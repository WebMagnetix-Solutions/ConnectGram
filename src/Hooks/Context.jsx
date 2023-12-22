/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const MyContext = createContext()

export const MyProvider = ({ children }) => {
    
    const [socket, setSocket] = useState(null)

    return (
        <MyContext.Provider value={{ socket, setSocket }}>
            {children}
        </MyContext.Provider>
    )

}

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
    return useContext(MyContext)
} 