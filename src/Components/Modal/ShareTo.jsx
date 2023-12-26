/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { getFollowings } from "../../Utils/api/user"
import toast from "react-hot-toast"
import { createChat, sendMessgae } from "../../Utils/api/chat"
import { useSocket } from "../../Hooks/Context"
import Verified from "../Verified"

const ShareTo = ({ shareTo, setShareTo, userInfo }) => {
    
    const [followings, setFollowings] = useState([])
    const { socket } = useSocket()
    const [sentList, setSentList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getFollowings(userInfo._id)
            if (response.result) {
                setFollowings(response.result)
            } else {
                toast.error(response.message)
            }
        }
        fetchData()
    }, [])

    const handleSendMessage = async (chat_id, name) => {
        if (!sentList.includes(chat_id)) {
            const resData = await createChat(userInfo._id, chat_id)
            if (resData.result) {
                const messageData = {
                    content: `${window.location.origin}/post?view=${shareTo}`,
                    chat_id: resData.result._id,
                    sender: userInfo._id
                }
                const response = await sendMessgae(messageData)
                if (response.result) {
                    socket.emit("newMessage", response.result)
                    setSentList((list) => ([...list, chat_id]))
                    toast.success("Sent to " + name)
                } else {
                    toast.error(response.message)
                }
            } else {
                toast.error(resData.message)
            }
        }
    }

    return (
        <div className={`flex w-full sm:w-11/12 md:w-9/12 lg:w-6/12 absolute z-50 justify-center bg-black h-screen duration-200 transition-all`}>
            <div className={`px-5 py-5 w-[97vw] overflow-y-scroll shadow max-h-max shadow-black absolute flex flex-col gap-2 bg-[#222] rounded-xl duration-200 transition-all sm:w-[500px]`}>
                <div onClick={()=>setShareTo("")} className="w-6 h-6 cursor-pointer right-2 top-2 bg-red-600 flex justify-center items-center text-white rounded-full absolute">
                    <i className="fa fa-close"/>
                </div>
                <h1 className="text-white text-center mb-4 text-xl">Send to</h1>
                {
                    followings.map((item, index) => {
                        return (
                            <div key={index} className="flex justify-between items-center bg-[#1c1c1c] p-2 rounded-xl text-white">
                                <div className="flex items-center">
                                    <div>
                                        <img alt={item.username} src={item.pic} className="w-12 h-12 rounded-full"/>
                                    </div>
                                    <div className="ms-2">
                                        <p>{item.name}</p>
                                        <p className="flex items-center">{item.username} {item.verified && <Verified verified={item.verified} />}</p>
                                    </div>
                                </div>
                                <div>
                                    <button className={`p-1 px-2 outline-none ${sentList.includes(item._id) ? `border-blue-900` : `bg-blue-900`} rounded-xl`} onClick={()=>handleSendMessage(item._id, item.name)}>{sentList.includes(item._id) ? `Sent` : `Send`}</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ShareTo
