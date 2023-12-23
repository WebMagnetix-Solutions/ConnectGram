import { useEffect } from "react"
import AppRouter from "./Routes/Routes"

const App = () => {

    let touchTime = null

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

    useEffect(() => {

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
        <AppRouter/>
    )
}

export default App