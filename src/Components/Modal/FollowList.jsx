/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom"
import { getMyData } from "../../Auth"
import { followOrUnfollow } from "../../Utils/api/user"
import Verified from "../Verified"
import toast from "react-hot-toast"

const FollowList = ({ list, myData, setMyData, setFollowList }) => {

    const userInfo = getMyData()
    const navigate = useNavigate()
    
    const manageFollow = async (user_id, to_id) => {
        const response = await followOrUnfollow(user_id, to_id)
        if (response.following) {
            if (myData.following.includes(to_id)) {
                myData.following.splice(myData.following.indexOf(to_id),1)
                setMyData((item) => ({...item, following: myData.following}))
            } else {
                setMyData({...myData, following: [...myData.following, to_id]})
            }
        } else {
            toast.error(response.message)
        }
    }

    return (
        <div className={`flex w-full sm:w-11/12 md:w-9/12 lg:w-6/12 absolute z-50 justify-center bg-black h-screen ${list.title && list.list?.length>0 ? `bg-opacity-25 pointer-events-auto` : `bg-opacity-0 pointer-events-none`} duration-200 transition-all`}>
            <div className={`px-5 py-5 w-[97vw] overflow-y-scroll shadow h-screen shadow-black absolute flex flex-col gap-2 bg-[#222] rounded-xl duration-200 transition-all sm:w-[500px] ${list.title && list.list?.length>0 ? `opacity-100 p-3` : `opacity-0`}`}>
                <div onClick={()=>setFollowList({title:"",list:[]})} className="w-4 h-4 cursor-pointer text-white absolute right-2 top-2 flex justify-center items-center bg-red-600 rounded-full">
                    <i className="fa text-xs fa-close"/>
                </div>
                <h1 className="text-white text-center text-lg font-semibold">{list.title}</h1>
                {
                    list.list.map(item => {
                        return (
                            <div key={item._id} className="bg-[#1c1c1c] flex justify-between items-center rounded-xl p-2">
                                <div className="flex items-center" onClick={() => navigate(`/user?username=${item.username}`)}>
                                    <div>
                                        <img alt={item.username} src={item.pic} className="rounded-full w-12 h-12"/>
                                    </div>
                                    <div className="ms-2 text-white">
                                        <p>{item.name}</p>
                                        <p className="flex text-xs items-center">@{item.username} <Verified verified={item.verified} /></p>
                                    </div>
                                </div>
                                <div>
                                    {userInfo.username === item.username ? <span className="text-white">You</span> : <button onClick={async () => await manageFollow(myData._id, item._id)} className="bg-blue-900 p-1 px-2 rounded-xl text-white">{myData.following?.includes(item._id) ? "Unfollow" : myData.followers?.includes(item._id) ? "Follow Back" : "Follow"}</button>}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FollowList
