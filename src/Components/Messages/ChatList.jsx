/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react"
import { getChatList } from "../../Utils/api/chat"
import { getMyData, removeAuth } from "../../Auth"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const ChatList = ({setMessageShow, newMessage}) => {

    const [chats, setChats] = useState([])
    const [search, setSearch] = useState("")
    const userInfo = getMyData()
    const navigate = useNavigate()

    const manageChatList = async (response) => {
        if (response.result) {
            const result = response.result.map(item => {
                if (item.users[0]._id === userInfo._id) {
                    return {...item, users: [item.users[1]]}
                }
                return {...item, users: [item.users[0]]}
            })
            setChats(result)
        } else {
            if (response === 401) {
                removeAuth()
                navigate("/login")
            } else {
                toast.error(response)
            }
        }
        
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await getChatList(userInfo._id)
            await manageChatList(response)
        }
        fetchData()
    }, [newMessage])

    useEffect(() => {
        if (search.length === 0) {
            handleSearch(true)
        }
    }, [search])

    const handleSearch = async (refresh=false) => {
        if (search.trim().length === 0 && !refresh) {
            return
        }
        const response = await getChatList(userInfo._id, search.trim())
        await manageChatList(response)
    }

    return (
        <Fragment>
            <div className="w-full break-all pt-14 bg-[#111] flex flex-col gap-3 overflow-y-auto bg-opacity-20 p-5 px-5 sm:w-[500px] text-white h-screen">
                {
                    chats.length > 0 && chats.map((item) => {
                        return (
                            <div onClick={() => { setMessageShow(item) }} key={item._id} className="flex cursor-pointer justify-between items-center px-5 text-white bg-[#222] p-2.5 rounded-2xl">
                                <div className="flex items-center">
                                    <div>
                                        <img alt="user image" src={item.users[0].pic} className="w-12 h-12 rounded-full" onClick={()=>navigate(`/user?username=${item.users[0].username}`)}/>
                                    </div>
                                    <div className="ms-3 flex flex-col justify-center">
                                        <p>{item.users[0].name}</p>
                                        <p className="text-[10px] mt-1"><i className="fa fa-check-double mr-1 text-sky-600"/> { item.lastMessage.length > 10 ? item.lastMessage.slice(0,10)+"..." : item.lastMessage || "--" }</p>
                                    </div>
                                </div>
                                <div className="text-xs flex flex-col">
                                    {new Date(item.updatedAt).toLocaleString("default", { hour: "2-digit", minute: "2-digit" })}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="absolute text-white w-full px-5 flex flex-shrink-0 sm:w-[500px] pt-1 rounded-xl gap-3">
                <input value={search} onChange={e=>setSearch(e.target.value)} type="text" placeholder="Search user..." className="w-full bg-[#222] outline-none shadow shadow-black p-2 rounded-xl"/>
                <div onClick={async ()=>await handleSearch()} className="w-12 cursor-pointer h-10 bg-[#222] flex justify-center items-center shadow shadow-black rounded-full">
                    <i className="fa fa-search text-white"/>
                </div>
            </div>
        </Fragment>
    )
}

export default ChatList
