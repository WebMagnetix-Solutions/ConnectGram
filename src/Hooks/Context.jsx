import { createContext, useContext, useState } from "react";

const MyContext = createContext()

export const MyProvider = ({ children }) => {
    
    const [selectedOption, setSelectedOption] = useState("Home")

    return (
        <MyContext.Provider value={{ selectedOption, setSelectedOption }}>
            {children}
        </MyContext.Provider>
    )

}

export const useGState = () => {
    return useContext(MyContext)
}