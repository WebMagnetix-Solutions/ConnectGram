import { Fragment, useEffect, useState } from "react"
import { getMe } from "../../Utils/api/user"
import { getMyData, removeAuth } from "../../Auth"
import MyPosts from "./MyPosts"
import { useNavigate } from "react-router-dom"
import EditProfile from "../Modal/EditProfile"
import toast from "react-hot-toast"

const MyProfile = () => {
    
    const [myData, setMyData] = useState({})
    const [selected, setSelected] = useState("image")
    const [isEdit, setEdit] = useState(false)
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchData = async () => {
            const user = getMyData()
            const response = await getMe(user._id)
            if (response.result) {
                setMyData(response.result)
            } else {
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

    const handleLogOut = () => {
        removeAuth()
        navigate("/login")
    }
    
    return (
        <Fragment>
            {myData._id && <EditProfile myData={myData} setMyData={setMyData} setEdit={setEdit} isEdit={isEdit} /> }
            <div className="pb-16 sm:pb-1 pt-3 text-white w-full px-2 sm:px-10 h-screen overflow-y-auto">
                <div className="flex sm:justify-between">
                    <div className="flex justify-center flex-col items-center">
                        <img src={myData.pic} className="w-20 h-20 rounded-full" alt={myData.username} />
                    </div>
                    <div className="flex justify-between items-center gap-5 ms-10">
                        <div className="flex flex-col justify-center items-center">
                            <p>{ myData.posts?.length }</p>
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
                    <div className="hidden sm:flex flex-col xl:flex-row justify-center items-center gap-4">
                        <button className="bg-blue-800 p-1 px-2 rounded-xl" onClick={()=>setEdit(!isEdit)}>Edit Profile</button>
                        <button className="bg-blue-800 p-1 px-2 rounded-xl"  onClick={handleLogOut}>LogOut</button>
                    </div>
                </div>

                <div className="mt-2">
                    <p className="">{myData.name}</p>
                    <p className="text-sm flex items-center">@{myData.username} { myData.verified && <img className="w-3 h-3 mx-1 mt-0.5 " src={ import.meta.env.VITE_VERIFY } /> }</p>
                    <div className="whitespace-pre-wrap mt-2">
                        {myData.bio}
                    </div>
                </div>

                <div className="flex sm:hidden flex-row justify-center items-center gap-4 w-full mt-5">
                        <button className="bg-blue-800 p-1 px-2 rounded-xl w-full" onClick={()=>setEdit(!isEdit)}>Edit Profile</button>
                        <button className="bg-blue-800 p-1 px-2 rounded-xl w-full" onClick={handleLogOut}>LogOut</button>
                    </div>

                <div>
                    <div className="flex justify-around mt-8 w-full gap-3">
                        <i onClick={()=>setSelected("image")} className={`fa cursor-pointer fa-image ${selected === "image" ? `bg-black bg-opacity-30` : `bg-white bg-opacity-5` } transition-all duration-300 p-3 w-full rounded-full text-center`} />
                        <i onClick={() => setSelected("video")} className={`fa cursor-pointer fa-video ${selected === "video" ? `bg-black bg-opacity-30` : `bg-white bg-opacity-5`} transition-all duration-300 p-3 w-full rounded-full text-center`} />
                        <i onClick={()=>setSelected("saved")} className={`fa cursor-pointer fa-bookmark ${selected === "saved" ? `bg-black bg-opacity-30` : `bg-white bg-opacity-5`} transition-all duration-300 p-3 w-full rounded-full text-center`} />
                    </div>
                    {
                        selected === "image" ? <MyPosts type={"image"} /> : 
                            selected === "video" ? <MyPosts type={"video"} /> : 
                                selected === "saved" ? <MyPosts type={"saved"} /> : null
                    }
                </div>

            </div>
        </Fragment>
    )
}

export default MyProfile
