import { Fragment, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { deletePost, getSinglePost, likeOrDislike, saveOrUnSave } from "../../Utils/api/post"
import { getMyData } from "../../Auth"
import toast from "react-hot-toast"
import Comments from "../Comments/Comments"
import { copyToClipboard } from "../../Utils/Helper/Helper"
import Loading from "../Loading"
import ShareTo from "../Modal/ShareTo"

const SinglePost = () => {

    const search = useLocation()
    const location = new URLSearchParams(search.search)
    const view = location.get("view")
    const navigate = useNavigate()

    const [singlePost, setSinglePost] = useState({})
    const userInfo = getMyData()
    const [menuOptions, setMenuOptions] = useState("")
    const [showComment, setShowComment] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const [shareTo, setShareTo] = useState("")

    useEffect(() => {
        if (!view) {
            navigate("/")
        } else {
            const fetchData = async () => {
                const response = await getSinglePost(view)
                if (response.result) {
                    setSinglePost(response.result[0])
                    setIsLoading(false)
                } else {
                    toast.error(response.message)
                }
            }
            fetchData()
        }
    }, [search])

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
            setSinglePost({ ...singlePost, likes: response.likes })
        } else {
            toast.error(response.message)
        }
    }

    const updateSave = async (post_id, user_id) => {
        const response = await saveOrUnSave(post_id, user_id)
        if (response.saved) {
            setSinglePost({ ...singlePost, saved: response.saved })
        } else {
            toast.error(response.message)
        }
    }

    const removePost = async (postid, url, type) => {
        toast.promise(deletePost(postid, url, type), {
            loading: "Deleting...",
            success: (response) => {
                setSinglePost({})
                return response.message
            },
            error: (response) => {
                return response
            }
        })
    }

    if (isLoading) {
        return (<Loading/>)
    }

    return (
        <Fragment>
            {
                singlePost._id && <Fragment>
                    {shareTo && <ShareTo shareTo={shareTo} setShareTo={setShareTo} userInfo={userInfo} />}
                    <Comments post={showComment} posts={singlePost} setPosts={setSinglePost} setShowComment={setShowComment} />
                    <div className="pb-16 sm:pb-1 pt-3 text-white w-full px-2 sm:px-10 h-screen overflow-y-auto">
                        <div className="flex justify-center">
                            <div key={singlePost._id} className="bg-[#333] overflow-hidden p-2 bg-opacity-30 mb-3 rounded-xl w-96 md:w-[450px]">
            
                                <div className="flex justify-between">
                                    <div className="flex items-center singlePosts-center mb-2">

                                        <div className="cursor-pointer">
                                            <img src={singlePost.user[0]?.pic} alt={singlePost.user[0]?.username} onClick={()=>navigate(`/user?username=${singlePost.user[0].username}`)} className="w-10 h-10 cursor-pointer rounded-full" />
                                        </div>

                                        <div className="flex ml-1 flex-col text-white text-opacity-70 mt-[-5px]">
                                            <span className="text-base flex items-center singlePosts-center cursor-pointer" onClick={()=>navigate(`/user?username=${singlePost.user[0].username}`)}>{singlePost.user[0]?.username} {singlePost.user[0].verified && <img className="w-3 h-3 mx-1 mt-0.5 " src={import.meta.env.VITE_VERIFY} />}</span>
                                            <span className="text-[10px] cursor-pointer">{ singlePost.location }</span>
                                        </div>

                                    </div>

                                    <div className=" cursor-pointer relative">
                                        <i className="fa fa-ellipsis text-white text-opacity-70" onClick={()=>showOptions(singlePost._id)}></i>
                                        <section className={`absolute bg-black z-50 text-white p-3 px-5 right-3 ${menuOptions===singlePost._id ? `opacity-100 pointer-events-auto` : `opacity-0 pointer-events-none`} transition-all duration-500 top-4 rounded-xl whitespace-nowrap`}>
                                            <p onClick={()=> copyToClipboard(window.location.href)}><i className="fa fa-copy mb-2" /> Copy</p>
                                            {
                                                userInfo._id == singlePost.user[0]?._id && <p className="text-red-600" onClick={async ()=> await removePost(singlePost._id, singlePost.url, singlePost.type)}><i className="fa fa-trash"/> Delete</p>
                                            }
                                        </section>
                                    </div>

                                </div>

                                <div onDoubleClick={async () => await updateLike(singlePost._id, userInfo._id)}>
                                    {singlePost.type == "image" && <img src={singlePost.url} alt={singlePost.caption} className="rounded-xl bg-[#1c1c1c] flex w-full object-contain shadow-sm shadow-[#111] aspect-square cursor-pointer" />}
                                    {singlePost.type == "video" && <span className="relative cursor-pointer rounded-xl flex w-full object-contain shadow-sm shadow-[#111] aspect-square"> 
                                        <video src={singlePost.url} onClick={(e) => {
                                            if (e.currentTarget.paused) {
                                                e.currentTarget.play()
                                                setIsPlaying(true)
                                            } else {
                                                e.currentTarget.pause()
                                                setIsPlaying(false)
                                            }
                                        }} alt={singlePost.caption} className="rounded-xl bg-[#1c1c1c] flex w-full object-contain shadow-sm shadow-[#111] aspect-square cursor-pointer" />
                                        {
                                            !isPlaying && <i className="fa fa-play pointer-events-none text-white text-2xl sm:text-4xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" />
                                        }
                                    </span>}
                                </div>

                                <div className="mt-2 flex justify-between text-white text-opacity-70">
                                    
                                    <div className="flex justify-between gap-3 text-lg">
                                        <i className={`fa${singlePost.likes?.includes(userInfo._id) ? `s text-red-500` : `r`} fa-heart cursor-pointer`} onClick={async () => await updateLike(singlePost._id, userInfo._id)}></i>
                                        <i className="far fa-comment cursor-pointer" onClick={() => setShowComment(singlePost._id)}></i>
                                        <i className="far fa-paper-plane cursor-pointer" onClick={()=>setShareTo(singlePost._id)}></i>
                                    </div>
                                    <div className="text-lg">
                                        <i className={`fa${singlePost.saved?.includes(userInfo._id) ? `s` : `r`} fa-bookmark cursor-pointer`} onClick={async () => await updateSave(singlePost._id, userInfo._id)}></i>
                                    </div>

                                </div>

                                <p className="text-sm mb-1 text-white text-opacity-70">{singlePost.likes?.length} Likes</p>
                                <p className="text-sm mb-1 text-white text-opacity-70">{ singlePost.comments?.length} Comments</p>

                                <div className="break-words text-xs text-white text-opacity-50">
                                    <span className="font-semibold text-white text-opacity-80">{singlePost.user[0]?.username}</span> {singlePost.caption} <span className="text-blue-600">{ singlePost.tags.join(" ") }</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </Fragment>
            }      
        </Fragment>
    )
}

export default SinglePost
