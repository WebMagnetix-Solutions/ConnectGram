import { createContext, useContext, useState } from "react";

const MyContext = createContext()

export const MyProvider = ({ children }) => {
    
    const [isLoading, setIsLoading] = useState(true)

    return (
        <MyContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </MyContext.Provider>
    )

}

export const useGState = () => {
    return useContext(MyContext)
}