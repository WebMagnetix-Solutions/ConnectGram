import { useEffect, useState } from "react"
import { getMyData, removeAuth } from "../../Auth"
import { getMyPosts } from "../../Utils/api/post"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const MyPosts = (prop) => {

    const [myPosts, setMyPosts] = useState([])
    const userInfo = getMyData()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const user = getMyData()
            const response = await getMyPosts(user._id)
            if (response.result) {
                if (prop.type == "saved") {
                    setMyPosts(response.result.filter(item => item.saved.includes(userInfo._id)))
                } else {
                    setMyPosts(response.result.filter(item => item.type === prop.type))
                }
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
    }, [prop.type])

    return (
        <div className="grid grid-cols-3 mt-10 gap-2">
            {
                myPosts.map(item => {
                    return (
                        <div key={item._id} className="relative group" onClick={()=>navigate(`/post?view=${item._id}`)}> 
                            <span className="absolute flex items-center justify-evenly w-full top-1/2 left-1/2 translate-x-[-50%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-[-50%] group-hover:">
                                <p>{item.likes.length} <i className="fa fa-heart" /></p>
                                <p>{item.comments.length} <i className="fa fa-comment"/></p>
                            </span>
                            {item.type === "image" && <img alt={item.caption} src={item.url} className="rounded-xl cursor-pointer aspect-square group-hover:opacity-20 object-fill" />}
                            {item.type === "video" && <video alt={item.caption} src={item.url} className="rounded-xl aspect-square group-hover:opacity-20 object-fill cursor-pointer" />}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MyPosts
