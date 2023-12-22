import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const Page404 = () => {

    const [seconds, setSeconds] = useState(5)
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds === 0) {
                    clearInterval(timer)
                    navigate("/")
                    return 0
                }
                return prevSeconds - 1
            });
        }, 1000);
        return () => {
            clearInterval(timer);
        }
      }, []);

    return (
        <div className="flex justify-center text-white flex-col items-center h-screen w-screen cursor-not-allowed">
            <p className="font-mono text-xl">404 | Not Found</p>
            <p className="mt-4">Redirecting in {seconds} seconds</p>
        </div>
    )
}

export default Page404
