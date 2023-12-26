import { useEffect, useState } from "react"
import { followOrUnfollow, suggestUsers } from "../../Utils/api/user"
import { getMyData } from "../../Auth"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const HomeSuggestions = () => {

    const [suggestions, setSuggestions] = useState([])
    const userInfo = getMyData()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const response = await suggestUsers(userInfo._id)
            if (response.result) {
                setSuggestions(response.result)
            } else {
                toast.error(response.message)
            }
            
        }
        fetchData()
    }, [])

    const manageFollow = async (user_id, to_id) => {
        const response = await followOrUnfollow(user_id, to_id)
        if (response.following){
            setSuggestions(suggestions.filter(item => {
                return item._id !== to_id
            }))
        } else {
            toast.error(response.message)
        }
    }

    return (
        <div className="hidden lg:flex lg:col-span-4 text-black bg-[#333] bg-opacity-30 justify-center overflow-y-auto">
            <div>
                <div className="bg-[#333] rounded-full p-2 bg-opacity-30 mx-2 mt-5">
                    <h4 className="text-white text-center text-opacity-70">User suggestions for you</h4>
                </div>
                <div className="mt-5 mx-2">
                    {
                        suggestions.filter(item => item._id !== userInfo._id).map((item, index) => {
                            return (
                                <div key={index} className="bg-[#333] mb-3 w-[300px] xl:w-[360px] flex justify-between items-center px-4 rounded-xl p-2 bg-opacity-30 text-white text-opacity-70">
                                    <div className="flex items-center justify-between cursor-pointer" onClick={()=>navigate(`/user?username=${item.username}`)}>
                                        <div>
                                            <img src={item.pic} alt={ item.username } className="w-12 h-12 rounded-full"/>
                                        </div>
                                        <div className="flex flex-col ms-2 overflow-x-hidden">
                                            <span className="whitespace-nowrap">{item.name}</span>
                                            <span className="text-sm flex items-center">@{ item.username } { item.verified && <img className="w-3 h-3 mx-1 mt-0.5 " src={ import.meta.env.VITE_VERIFY } /> }</span>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="p-1 px-2 whitespace-nowrap bg-blue-900 rounded-xl" onClick={async () => await manageFollow(userInfo._id, item._id)}>{!item.followers?.includes(userInfo._id) ? "Follow Back" : "Follow"}</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeSuggestions
