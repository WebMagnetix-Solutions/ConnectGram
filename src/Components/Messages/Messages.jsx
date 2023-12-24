/* eslint-disable react/prop-types */
import { Fragment, useEffect, useRef, useState } from "react"
import { getAllMessages, sendMessgae } from "../../Utils/api/chat"
import { getMyData, removeAuth } from "../../Auth"
import { useSocket } from "../../Hooks/Context"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Messages = ({messageShow, newMessage, setMessageShow}) => {
    
    const selectedChat = useRef(null)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const userInfo = getMyData()
    const messagesRef = useRef(null)
    const { socket } = useSocket()
    const navigate = useNavigate()

    useEffect(() => {
        selectedChat.current = messageShow
        const fetchData = async () => {
            const response = await getAllMessages(selectedChat.current._id)
            if (response.result) {
                setMessages(response.result)
            } else {
                if (response === 401) {
                    removeAuth()
                    navigate("/login")
                } else {
                    toast.error(response)
                }
            }
        }
        selectedChat.current && fetchData()
    }, [messageShow])

    useEffect(() => {
        if (newMessage?.chat_id) {
            setMessages((messages) => [...messages, newMessage])
        }
    }, [newMessage])

    useEffect(() => {
        if (messagesRef.current) {
            const scrollOptions = {
                top: messagesRef.current.scrollHeight, 
                behavior: 'smooth', 
            };
              messagesRef.current.scrollTo(scrollOptions);
        }
    }, [messages])

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (message.trim() === "") {
            return toast.error("Message is empty")
        }
        const messageData = {
            content: message,
            chat_id:selectedChat.current?._id,
            sender:userInfo._id
        }
        const response = await sendMessgae(messageData)
        if (response.result) {
            socket.emit("newMessage", response.result)
            setMessage("")
            setMessages((messages) => [...messages, response.result])
        } else {
            if (response === 401) {
                removeAuth()
                navigate("/login")
            } else {
                toast.error(response)
            }
        }
    }

    return (
        <Fragment>
            <div ref={messagesRef} className="w-full scroll-smooth break-all pt-20 pb-16 bg-[#111] overflow-y-auto bg-opacity-20 p-2 sm:w-[500px] text-white h-screen">
                {
                    messages.map((item, index) => {
                        return (
                            <div key={index} className={`w-full flex ${item.sender._id === userInfo._id ? `justify-end` : `justify-start`} ${messages.length!==index+1 && `mb-3`}`}>
                                <div className={`p-1 text-xs min-w-[100px] max-w-[250px] sm:text-base sm:max-w-[350px] whitespace-pre-wrap rounded-xl ${item.sender._id === userInfo._id ? `rounded-br-none` : `rounded-bl-none`} bg-opacity-30 px-2 ${item.sender._id === userInfo._id ? `bg-gray-600` : `bg-[#333]`}`}>
                                    <span className="pe-3">{item.content}</span>
                                    <p className="text-[8px] text-end"><i className="fa fa-check-double mr-1 text-sky-600"/> {new Date(item.createdAt).toLocaleString("default", {hour:"2-digit", minute: "2-digit"})}</p>
                                </div>
                                
                            </div>
                        )
                    })
                }
            </div>
            <div className="absolute bg-[#1f1f1f] border-2 border-opacity-20 border-black flex justify-between w-full px-5 top-0 flex-shrink-0 text-white sm:w-[500px] p-3 rounded">
                <div className="flex items-center cursor-pointer">
                    <div className="flex items-center">
                        <p className="cursor-pointer mr-3" onClick={()=>setMessageShow("")}><i className="fa fa-arrow-left"/></p> <img alt="profile" src={messageShow.users[0].pic} className="w-12 h-12 rounded-full"/>
                    </div>
                    <div className="ms-2" onClick={() => navigate(`/user?username=${messageShow.users[0].username}`)}>
                        <p>{messageShow.users[0].name}</p>
                        <p className="text-xs">@{ messageShow.users[0].username }</p>
                    </div>
                </div>
            </div>

            <div className="absolute bg-[#1f1f1f] border-2 border-opacity-20 border-black flex justify-between w-full px-5 bottom-12 sm:bottom-0 first-letter:flex-shrink-0 text-white sm:w-[500px] p-2.5 rounded">
                <form className="flex items-center w-full" onSubmit={async (e) => await handleSendMessage(e)}>
                    <div className="flex items-center w-full">
                        <textarea rows={1} value={message} onFocus={()=>console.log(socket.emit("isTyping", selectedChat.current?._id))} onChange={e => setMessage(e.target.value)} className="w-full resize-none p-2 rounded-full bg-black bg-opacity-50 outline-none text-white" placeholder="Message..."/>
                    </div>
                    <button type="submit" className="ms-2 outline-none w-12 h-10 cursor-pointer bg-black bg-opacity-50 rounded-full flex justify-center items-center text-white">
                        <i className="fa fa-paper-plane"/>
                    </button>
                </form>
            </div>
        </Fragment>
    )
}

export default Messages
