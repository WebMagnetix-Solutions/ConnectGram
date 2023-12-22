import { useEffect, useRef, useState } from "react"
import ChatList from "../Components/Messages/ChatList"
import Messages from "../Components/Messages/Messages"
import { useSocket } from "../Hooks/Context"
import { createSocket } from "../Utils/Helper/Helper"
import { getMyData } from "../Auth"
import toast from "react-hot-toast"

const ChatPage = () => {

    const [messageShow, setMessageShow] = useState("")
    const currentChat = useRef(null)
    const { socket, setSocket } = useSocket()
    const [newMessage, setNewMessage] = useState({})
    const [refreshList, setRefreshList] = useState(0)
    const userInfo = getMyData()

    useEffect(() => {
        const response = createSocket()
        response.emit("setup", userInfo._id)
        setSocket(response)
    }, [])

    useEffect(() => {
        if (messageShow) {
            currentChat.current = messageShow
        } else {
            currentChat.current = null
        }
    }, [messageShow])

    useEffect(() => {
        if (socket) {
            const handleNewMessage = (response) => {
                setRefreshList(new Date().getTime())
                if (response.chat_id._id === currentChat.current?._id) {
                    setNewMessage(response)
                } else {
                    return toast.success(`New message: ${response.sender.name}`)
                }
            }

            socket.on("ReceivedMessage", handleNewMessage)

            return () => socket.off("ReceivedMessage", handleNewMessage)
        }
    }, [socket])

    return (
        <div className="pb-14 sm:pb-0 w-full flex justify-center h-screen overflow-y-auto">
            {messageShow ? <Messages newMessage={newMessage} messageShow={messageShow} setMessageShow={setMessageShow} /> : <ChatList messageShow={messageShow} newMessage={refreshList} setMessageShow={setMessageShow} />}
            
        </div>
    )
}

export default ChatPage
