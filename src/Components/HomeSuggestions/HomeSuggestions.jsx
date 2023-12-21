import { useEffect, useState } from "react"
import { suggestUsers } from "../../Utils/api/user"
import { getMyData } from "../../Auth"

const HomeSuggestions = () => {

    const [suggestions, setSuggestions] = useState([])
    const userInfo = getMyData()

    useEffect(() => {
        const fetchData = async () => {
            const response = await suggestUsers(userInfo._id)
            if (response.result) {
                setSuggestions(response.result)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="hidden lg:flex lg:col-span-4 text-black bg-[#333] bg-opacity-30 justify-center overflow-y-auto">
            <div>
                <div className="bg-[#333] rounded-full p-2 bg-opacity-30 mx-2 mt-5">
                    <h4 className="text-white text-center text-opacity-70">People you may know</h4>
                </div>
                <div className="mt-5 mx-2">
                    {
                        suggestions.map((item, index) => {
                            return (
                                <div key={index} className="bg-[#333] mb-3 w-[300px] xl:w-[360px] flex justify-between items-center px-4 rounded-xl p-2 bg-opacity-30 text-white text-opacity-70">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <img src={item.pic} alt={ item.username } className="w-12 h-12 rounded-full"/>
                                        </div>
                                        <div className="flex flex-col ms-2 overflow-x-hidden">
                                            <span className="whitespace-nowrap">{item.name}</span>
                                            <span className="text-sm">@{ item.username }</span>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="p-1 px-2 bg-blue-900 rounded-xl">{item.following?.includes(userInfo._id) ? "Follow Back" : "Follow"}</button>
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
