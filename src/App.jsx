import { useEffect } from "react"
import AppRouter from "./Routes/Routes"
import {v4 as uuidv4} from "uuid"
import { useSocket } from "./Hooks/Context"
import toast from "react-hot-toast"

const App = () => {

    let touchTime = null
    const { socket } = useSocket()
    const currentPath = window.location.pathname

    const handleNewMessage = (response) => {
        return toast.success(`New message: ${response.sender.name}`)
    }

    useEffect(() => {
        if (currentPath !== "/messenger") {
            if (socket) {
                socket.on("ReceivedMessage", handleNewMessage)
            }
            return () => {
                if (socket) {
                    socket.off("ReceivedMessage")
                }
            }
        }
    }, [socket])

    const touchStart = () => {
        touchTime = Date.now()
    }

    const touchEnd = (e) => {
        const touchEndTime = Date.now()
        const touchDuration = touchEndTime - touchTime
        const shortTapThreshold = 300;
        if (touchDuration > shortTapThreshold) {
            e.preventDefault()
        }
    }

    const handleOnline = () => {
        if (navigator.onLine) {
            window.location.href = "/"
        } else {
            const route = uuidv4()
            localStorage.setItem("lostInternet", route)
            window.location.href = "/lost/connection/"+route
        }
    }

    useEffect(() => {

        if (!navigator.onLine && window.location.pathname.slice(0,17) !== "/lost/connection/") {
            handleOnline()
        }

        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOnline)
        document.addEventListener("contextmenu", (e) => e.preventDefault())
        document.addEventListener('touchstart', touchStart, { passive: false })
        document.addEventListener('touchend', touchEnd)
        document.body.style.overscrollBehavior = "none"
        document.addEventListener("keydown", (e) => {
            if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
                e.preventDefault()
            }
        })
        return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOnline)
            document.removeEventListener("contextmenu", (e) => e.preventDefault())
            document.removeEventListener('touchstart', touchStart, { passive: false })
            document.removeEventListener('touchend', touchEnd)
            document.body.style.overscrollBehavior = ""
            document.removeEventListener("keydown", (e) => {
                if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
                    e.preventDefault()
                }
            })
        }
    }, [])

    return (
        < AppRouter />
    )
}

export default App