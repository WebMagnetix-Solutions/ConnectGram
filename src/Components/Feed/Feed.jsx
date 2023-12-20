import { useEffect, useState } from "react"
import { getAllPosts } from "../../Utils/api/post"

const Feed = () => {

    const [posts, setPosts] = useState([])
    const [isPlay, setPlay] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllPosts()
            setPosts(response)
        }
        fetchData()
    }, [])

    return (
         
        <div className="pb-14 sm:pb-0 pt-1 bg-[#222] h-screen overflow-y-auto">
            {
                posts.map((item) => {
                    return (
                        <div key={item._id} className="bg-[#333] p-2 bg-opacity-30 mb-3 rounded-xl w-96 md:w-[450px]">

                            <div className="flex justify-between">
                                <div className="flex items-center mb-2">

                                    <div className="cursor-pointer">
                                        <img src={item.user[0].pic} alt={item.user[0].username} className="w-10 h-10 rounded-full" />
                                    </div>

                                    <div className="flex ml-1 flex-col text-white text-opacity-70 mt-[-5px]">
                                        <span className="text-base cursor-pointer">{item.user[0].username}</span>
                                        <span className="text-[10px] cursor-pointer">{ item.location }</span>
                                    </div>

                                </div>

                                <div className=" cursor-pointer">
                                    <i className="fa fa-ellipsis text-white text-opacity-70"></i>
                                </div>

                            </div>

                            <div>
                                {item.type == "image" && <img src={item.url} alt={item.caption} className="rounded-xl flex w-full object-contain" />}
                                {item.type == "video" && <video onClick={(e) => { setPlay(!isPlay); isPlay ? e.currentTarget.play() : e.currentTarget.pause()}} src={item.url} alt={item.caption} className="rounded-xl flex w-full object-contain cursor-pointer" />}
                            </div>

                            <div className="mt-2 flex justify-between text-white text-opacity-70">
                                
                                <div className="flex justify-between gap-3 text-lg">
                                    <i className="far fa-heart"></i>
                                    <i className="far fa-comment"></i>
                                    <i className="far fa-paper-plane"></i>
                                </div>
                                <div className="text-lg">
                                    <i className="far fa-bookmark"></i>
                                </div>

                            </div>

                            <p className="text-sm mb-1 text-white text-opacity-70">{ item.likes || 0 } Likes</p>

                            <div className="break-words text-xs text-white text-opacity-50">
                                <span className="font-semibold text-white text-opacity-80">{item.user[0].username}</span> {item.caption} <span className="text-blue-600">{ item.tags.join(" ") }</span>
                            </div>

                        </div>
                    )
                })
            }
        </div>

    )
}

export default Feed
