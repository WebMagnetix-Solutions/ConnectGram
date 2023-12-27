import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { validUser } from "../Utils/api/user"
import toast from "react-hot-toast"
import Page404 from "./Page404"

const UserVerify = () => {

    const { id } = useParams()
    const [valid, setValid] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const response = await validUser(id)
            if (response.result) {
                setValid(true)
                toast.success(response.message)
                const timeOut = setTimeout(() => {
                    clearTimeout(timeOut)
                    navigate("/login")
                }, 1500);
            } else {
                setValid(false)
            }
        }
        id && fetchData()
    }, [])

    if (!valid) {
        return <Page404 />
    }

    return (
        <div className="w-screen h-screen bg-[#222]"></div>
    )
   
}

export default UserVerify