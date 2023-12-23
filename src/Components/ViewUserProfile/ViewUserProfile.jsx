import { Fragment, useEffect, useState } from "react"
import { getUserByUsername } from "../../Utils/api/user"
import { getMyData, removeAuth } from "../../Auth"
import { useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import ViewUserPosts from "./ViewUserPosts"
import { createChat } from "../../Utils/api/chat"

const ViewUserProfile = () => {
    
    const [userData, setUserData] = useState({})
    const [selected, setSelected] = useState("image")
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const searchUsername = query.get("username")
    const userInfo = getMyData()
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await getUserByUsername(searchUsername)
            if (response.result) {
                if (response.result._id === userInfo._id) {
                    navigate("/my-profile", {replace: true})
                } else {
                    setUserData(response.result)
                }
            } else {
                console.log(response);
                if (response === 401) {
                    removeAuth()
                    navigate("/login")
                } else {
                    toast.error(response)
                }
            }
        }
        fetchData()
    }, [])
    
    return (
        <Fragment>
            <div className="pb-16 sm:pb-1 pt-3 text-white w-full px-2 sm:px-10 h-screen overflow-y-auto">
                <div className="flex sm:justify-between">
                    <div className="flex justify-center flex-col items-center">
                        <img src={userData.pic} className="w-20 h-20 rounded-full" alt={userData.username} />
                    </div>
                    <div className="flex justify-between items-center gap-5 ms-10">
                        <div className="flex flex-col justify-center items-center">
                            <p>{ userData.posts?.length }</p>
                            <p>Posts</p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <p>{ userData.followers?.length }</p>
                            <p>Followers</p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <p>{ userData.following?.length }</p>
                            <p>Followings</p>
                        </div>
                    </div>
                    <div className="hidden sm:flex flex-col xl:flex-row justify-center items-center gap-4">
                        <button className="bg-blue-800 p-1 px-2 rounded-xl" onClick={
                            async () => {
                                const response = await createChat(userInfo._id, userData._id)
                                    if (response.result) {
                                        navigate("/messenger")
                                    } else {
                                        toast.error(response)
                                    }
                                }
                            }
                        >Message</button>
                    </div>
                </div>

                <div className="mt-2">
                    <p className="">{userData.name}</p>
                    <p className="text-sm flex items-center">@{userData.username} { userData.verified && <img className="w-3 h-3 mx-1 mt-0.5 " src={ import.meta.env.VITE_VERIFY } /> }</p>
                    <div className="whitespace-pre-wrap mt-2">
                        {userData.bio}
                    </div>
                </div>

                <div className="flex sm:hidden flex-row justify-center items-center gap-4 w-full mt-5">
                    <button className="bg-blue-800 p-1 px-2 rounded-xl w-full" onClick={
                        async () => {
                            const response = await createChat(userInfo._id, userData._id)
                                if (response.result) {
                                    navigate("/messenger")
                                } else {
                                    toast.error(response)
                                }
                            }
                        }
                    >Message</button>
                </div>

                <div>
                    <div className="flex justify-around mt-8 w-full gap-3">
                        <i onClick={()=>setSelected("image")} className={`fa cursor-pointer fa-image ${selected === "image" ? `bg-black bg-opacity-30` : `bg-white bg-opacity-5` } transition-all duration-300 p-3 w-full rounded-full text-center`} />
                        <i onClick={() => setSelected("video")} className={`fa cursor-pointer fa-video ${selected === "video" ? `bg-black bg-opacity-30` : `bg-white bg-opacity-5`} transition-all duration-300 p-3 w-full rounded-full text-center`} />
                    </div>
                    {
                        selected === "image" ? <ViewUserPosts searchUsername={searchUsername} type={"image"} /> : 
                            selected === "video" ? <ViewUserPosts searchUsername={searchUsername} type={"video"} /> : null
                    }
                </div>

            </div>
        </Fragment>
    )
}

export default ViewUserProfile
