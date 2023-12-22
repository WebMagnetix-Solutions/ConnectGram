import { useEffect, useState } from "react"
import { deletePost, getFollowingPost, likeOrDislike, saveOrUnSave } from "../../Utils/api/post"
import { getMyData, removeAuth } from "../../Auth"
import toast from "react-hot-toast"
import Comments from "../Comments/Comments"
import { useNavigate } from "react-router-dom"
import { copyToClipboard } from "../../Utils/Helper/Helper"

const Feed = () => {

    const [posts, setPosts] = useState([])
    const userInfo = getMyData()
    const [menuOptions, setMenuOptions] = useState("")
    const [showComment, setShowComment] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const response = await getFollowingPost(userInfo._id)
            if (response.result) {
                setPosts(response.result)
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
    }, [])

    const showOptions = (id) => {
        if (menuOptions === id) {
            setMenuOptions("")
        } else {
            setMenuOptions(id)
        }
    }

    const updateLike = async (post_id, user_id) => {
        const response = await likeOrDislike(post_id, user_id)
        if (response.likes) {
            setPosts(posts.map(item => item._id === post_id ? { ...item, likes: response.likes } : item))
        } else {
            if (response === 401) {
                removeAuth()
                navigate("/login")
            } else {
                toast.error(response)
            }
        }
    }

    const updateSave = async (post_id, user_id) => {
        const response = await saveOrUnSave(post_id, user_id)
        if (response.saved) {
            setPosts(posts.map(item => item._id === post_id ? { ...item, saved: response.saved } : item))
        } else {
            if (response === 401) {
                removeAuth()
                navigate("/login")
            } else {
                toast.error(response)
            }
        }
    }

    const removePost = async (postid, url, type) => {
        toast.promise(deletePost(postid, url, type), {
            loading: "Deleting...",
            success: (response) => {
                setPosts(posts.filter(item => item._id !== postid))
                return response.message
            },
            error: (response) => {
                if (response === 401) {
                    removeAuth()
                    navigate("/login")
                } else {
                    return response
                }
            }
        })
    }

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
                                        <span className="text-base flex items-center cursor-pointer">{item.user[0].username} {item.user[0].verified && <img className="w-3 h-3 mx-1 mt-0.5 " src={import.meta.env.VITE_VERIFY} />}</span>
                                        <span className="text-[10px] cursor-pointer">{ item.location }</span>
                                    </div>

                                </div>

                                <div className=" cursor-pointer relative">
                                    <i className="fa fa-ellipsis text-white text-opacity-70" onClick={()=>showOptions(item._id)}></i>
                                    <section className={`absolute bg-black z-50 text-white p-3 px-5 ${menuOptions===item._id ? `right-3` : `right-[-10rem]`} transition-all duration-500 top-4 rounded-xl whitespace-nowrap`}>
                                        <p onClick={()=> copyToClipboard(window.location.href)}><i className="fa fa-copy mb-2" /> Copy</p>
                                        <p onClick={()=>navigate(`/post?view=${item._id}`)}><i className="fa fa-eye mb-2"/> View</p>
                                        {
                                            userInfo._id == item.user[0]._id && <p className="text-red-600" onClick={async ()=> await removePost(item._id, item.url, item.type)}><i className="fa fa-trash"/> Delete</p>
                                        }
                                    </section>
                                </div>

                            </div>

                            <div onDoubleClick={async () => await updateLike(item._id, userInfo._id)}>
                                {item.type == "image" && <img src={item.url} alt={item.caption} className="rounded-xl flex w-full object-contain" />}
                                {item.type == "video" && <video controls src={item.url} alt={item.caption} className="rounded-xl flex w-full object-contain cursor-pointer" />}
                            </div>

                            <div className="mt-2 flex justify-between text-white text-opacity-70">
                                
                                <div className="flex justify-between gap-3 text-lg">
                                    <i className={`fa${item.likes?.includes(userInfo._id) ? `s text-red-500` : `r`} fa-heart cursor-pointer`} onClick={async () => await updateLike(item._id, userInfo._id)}></i>
                                    <i className="far fa-comment cursor-pointer" onClick={() => setShowComment(item._id)}></i>
                                    <i className="far fa-paper-plane"></i>
                                </div>
                                <div className="text-lg">
                                    <i className={`fa${item.saved?.includes(userInfo._id) ? `s` : `r`} fa-bookmark cursor-pointer`} onClick={async () => await updateSave(item._id, userInfo._id)}></i>
                                </div>

                            </div>

                            <p className="text-sm mb-1 text-white text-opacity-70">{item.likes?.length} Likes</p>
                            <p className="text-sm mb-1 text-white text-opacity-70">{ item.comments?.length} Comments</p>

                            <div className="break-words text-xs text-white text-opacity-50">
                                <span className="font-semibold text-white text-opacity-80">{item.user[0].username}</span> {item.caption} <span className="text-blue-600">{ item.tags.join(" ") }</span>
                            </div>

                        </div>
                    )
                })
            }
            <Comments posts={posts} setPosts={setPosts} post={showComment} setShowComment={setShowComment} />
        </div>

    )
}

export default Feed
