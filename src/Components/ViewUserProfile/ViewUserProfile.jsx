import { Fragment, useEffect, useState } from "react"
import { followOrUnfollow, getFollowers, getFollowings, getMe, getUserByUsername } from "../../Utils/api/user"
import { getMyData } from "../../Auth"
import { useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import ViewUserPosts from "./ViewUserPosts"
import { createChat } from "../../Utils/api/chat"
import FollowList from "../Modal/FollowList"
import Loading from "../Loading"
import CreateMention from "../CreateMention"

const ViewUserProfile = () => {
    
    const [userData, setUserData] = useState({})
    const [selected, setSelected] = useState("image")
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const [followList, setFollowList] = useState({title: "", list: []})
    const searchUsername = query.get("username")
    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        const fetchData = async () => {
            const user = getMyData()
            const response = await getUserByUsername(searchUsername)
            const response1 = await getMe(user._id)
            if (response1.result) {
                setUserInfo(response1.result)
                setIsLoading(false)
            } else {
                toast.error(response.message)
            }
            if (response.result) {
                setUserData(response.result)
                setIsLoading(false)
            } else {
                toast.error(response.message)
            }
        }
        fetchData()
    }, [searchUsername])

    const fetchFollow = async (type, user_id) => {
        let response = null 
        if (type === "Followers") {
            response = await getFollowers(user_id)
        } else {
            response = await getFollowings(user_id)
        }
        if (response.result) {
            setFollowList({title: type, list: response.result})
        } else {
            toast.error(response.message)
        }
    }

    const manageFollow = async (user_id, to_id) => {
        const response = await followOrUnfollow(user_id, to_id)
        if (response.following){
            if (!userData.followers.includes(user_id)) { 
                setUserData({...userData, followers: [...userData.followers, user_id]})
            } else {
                userData.followers.splice(userData.followers.indexOf(user_id),1)
                setUserData((item) => ({...item, followers: userData.followers}))
            }
        } else {
            toast.error(response.message)
        }
    }

    if (isLoading) {
        return (<Loading/>)
    }
    
    return (
        <Fragment>
            {userData._id && <FollowList list={followList} setMyData={setUserInfo} myData={userInfo} setFollowList={setFollowList} />}
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
                        <div className="flex flex-col justify-center cursor-pointer items-center" onClick={async () => await fetchFollow("Followers", userData._id)}>
                            <p>{ userData.followers?.length }</p>
                            <p>Followers</p>
                        </div>
                        <div className="flex flex-col justify-center cursor-pointer items-center" onClick={async () => await fetchFollow("Followings", userData._id)}>
                            <p>{ userData.following?.length }</p>
                            <p>Followings</p>
                        </div>
                    </div>
                    <div className="hidden sm:flex flex-col xl:flex-row justify-center items-center gap-4">
                        {
                            userInfo._id !== userData._id ? <Fragment>
                                <button className="bg-blue-800 p-1 px-2 rounded-xl" onClick={async () => await manageFollow(userInfo._id, userData._id)}>{ userData.followers?.includes(userInfo._id) ? "Unfollow" : "Follow" }</button>
                                <button className="bg-blue-800 p-1 px-2 rounded-xl" onClick={
                                    async () => {
                                        const response = await createChat(userInfo._id, userData._id)
                                        console.log(response);
                                            if (response.result) {
                                                navigate("/messenger")
                                            } else {
                                                toast.error(response.message)
                                            }
                                        }
                                    }
                                >Message</button>
                            </Fragment> : 
                                <button className="p-1 px-2 bg-blue-800 rounded-xl" onClick={()=>navigate("/my-profile")}>Profile</button>
                        }
                    </div>
                </div>

                <div className="mt-2">
                    <p className="">{userData.name}</p>
                    <p className="text-sm flex items-center">@{userData.username} { userData.verified && <img className="w-3 h-3 mx-1 mt-0.5 " src={ import.meta.env.VITE_VERIFY } /> }</p>
                    <div className="whitespace-pre-wrap mt-2">
                        {userData.bio && <CreateMention text={userData.bio} />}
                    </div>
                </div>

                <div className="flex sm:hidden flex-row justify-center items-center gap-4 w-full mt-5">
                {
                            userInfo._id !== userData._id ? <Fragment>
                                <button className="bg-blue-800 p-1 w-full px-2 rounded-xl" onClick={async () => await manageFollow(userInfo._id, userData._id)}>{ userData.followers?.includes(userInfo._id) ? "Unfollow" : "Follow" }</button>
                                <button className="bg-blue-800 p-1 w-full px-2 rounded-xl" onClick={
                                    async () => {
                                        const response = await createChat(userInfo._id, userData._id)
                                        console.log(response);
                                            if (response.result) {
                                                navigate("/messenger")
                                            } else {
                                                toast.error(response.message)
                                            }
                                        }
                                    }
                                >Message</button>
                            </Fragment> : 
                                <button className="p-1 px-2 bg-blue-800 w-full rounded-xl" onClick={()=>navigate("/my-profile")}>Profile</button>
                        }
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
