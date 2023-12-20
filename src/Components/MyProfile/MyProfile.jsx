import { useEffect, useState } from "react"
import { getMe } from "../../Utils/api/user"
import { getMyData } from "../../Auth"
import MyPosts from "./MyPosts"

const MyProfile = () => {
    
    const [myData, setMyData] = useState({})
    const [selected, setSelected] = useState("image")
    
    useEffect(() => {
        const fetchData = async () => {
            const user = getMyData()
            const response = await getMe(user._id)
            setMyData(response)
        }
        fetchData()
    }, [])
    
    return (
        <div className="pb-16 sm:pb-1 pt-3 text-white w-full px-2 sm:px-10 h-screen overflow-y-auto">
            <div className="flex justify-between">
                <div className="flex justify-center flex-col items-center">
                    <img src={myData.pic} className="w-20 h-20 rounded-full" alt={myData.username} />
                </div>
                <div className="flex justify-between items-center gap-5">
                    <div className="flex flex-col justify-center items-center">
                        <p>0</p>
                        <p>Posts</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p>{ myData.followers?.length }</p>
                        <p>Followers</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p>{ myData.following?.length }</p>
                        <p>Followings</p>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center gap-4">
                    <button className="bg-blue-800 p-1 px-2 rounded-xl">Edit Profile</button>
                    <button className="bg-blue-800 p-1 px-2 rounded-xl">Share Profile</button>
                </div>
            </div>

            <div className="mt-2">
                <p className="">{myData.name}</p>
                <p className="text-sm">@{myData.username}</p>
                <div className="whitespace-pre-wrap mt-2">
                    {myData.bio || `shdfkjshdk 
fhksjdf skjdfhksjdhfk sdfskdjfh
skdhfwheiuweuiwe sdhfksjhdfhsdk
jfhksjdhfksjdhkj`}
                </div>
            </div>

            <div>
                <div className="flex justify-around mt-10 w-full gap-3">
                    <i onClick={()=>setSelected("image")} className={`fa cursor-pointer fa-image ${selected === "image" && `bg-black bg-opacity-30` } p-3 w-full rounded-full text-center`} />
                    <i onClick={()=>setSelected("video")} className={`fa cursor-pointer fa-video ${selected === "video" && `bg-black bg-opacity-30`} p-3 w-full rounded-full text-center`} />
                </div>
                {
                    selected === "image" ? <MyPosts type={"image"} /> : 
                        selected === "video" ? <MyPosts type={"video"}/> : null
                }
            </div>

        </div>
    )
}

export default MyProfile
