import { useEffect, useState } from "react"
import { getMyData } from "../../Auth"
import { getMyPosts } from "../../Utils/api/post"

const MyPosts = (prop) => {

    const [myPosts, setMyPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const user = getMyData()
            const response = await getMyPosts(user._id)
            setMyPosts(response.filter(item => item.type === prop.type))
        }
        fetchData()
    }, [prop.type])

    return (
        <div className="grid grid-cols-3 mt-10 gap-2">
            {
                myPosts.map(item => {
                    return (
                        <div key={item._id}>
                            {item.type === "image" && <img alt={item.caption} src={item.url} className="rounded-xl cursor-pointer aspect-square object-fill" />}
                            {item.type === "video" && <video alt={item.caption} src={item.url} className="rounded-xl aspect-square object-fill cursor-pointer" />}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MyPosts
