/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { addComment, commentLikeOrDislike, getComments } from "../../Utils/api/post"
import toast from "react-hot-toast"
import { getMyData } from "../../Auth"
import { getMoment } from "../../Utils/Helper/Helper"
import CreateMention from "../CreateMention"

const Comments = ({ post, setShowComment, posts, setPosts }) => {

    const [comments, setComments] = useState([])
    const [commentText, setCommentText] = useState("")
    const userInfo = getMyData()

    useEffect(() => {
        const fetchData = async () => {
            const response = await getComments(post)
            if (response.result) {
                setComments(response.result)
            } else {
                toast.error(response.message)
            }  
        }
        post && fetchData()
    }, [post])

    const handleComment = async () => {
        if (!commentText) {
            toast.error("Message is empty")
            return
        }
        const formData = {}
        formData.message = commentText
        formData.post_id = post
        formData.posted_by = userInfo._id
        const response = await addComment(formData)
        if (response.result) {
            setCommentText("")
            if (Array.isArray(posts)) {
                setPosts(posts.map(item => {
                    if (item._id === post) {
                        return {...item, comments: response.result}
                    }
                    return item
                }))
            } else {
                setPosts({...posts, comments: response.result})
            }
            setComments(response.result)
        } else {
            toast.error(response.message)
        }
    }

    const manageCommentLike = async (id) => {
        const response = await commentLikeOrDislike(id, userInfo._id)
        if (response.likes) {
            setComments(comments.map(item => item._id === id ? { ...item, likes: response.likes } : item))
        } else {
            toast.error(response.message)
        }
    }

    return (
        <div className={`h-4/5 break-all z-[1] text-white w-96 md:w-[450px] rounded-t-2xl bg-[#222] shadow shadow-black transition-all duration-300 fixed ${post ? `bottom-0` : `bottom-[-100rem]`} overflow-y-auto`}>
            <div className="w-full h-4/5">
                <div className="h-32 bottom-8 sm:bottom-0 pt-5 bg-[#222] shadow shadow-black">
                    <div className="flex justify-between px-2">
                        <h1 className="font-semibold">Comments ({ comments.length })</h1>
                        <div onClick={()=>setShowComment("")} className="cursor-pointer top-1 right-1 w-6 h-6 flex justify-center items-center text-white rounded-full bg-red-600">
                            <i className="fa fa-close"/>
                        </div>
                    </div>
                    <div className="w-96 px-2 md:w-[450px] mt-4 flex justify-between items-center sm:bottom-1">
                        <div className="w-10/12">
                            <input value={commentText} onChange={e=>setCommentText(e.target.value)} className="w-full p-2.5 px-2 rounded-2xl outline-none bg-[#111] bg-opacity-60" placeholder="Leave a comment" />
                        </div>
                        <div onClick={async () => await handleComment()} className="w-12 h-12 bg-[#111] bg-opacity-60 rounded-full flex justify-center  items-center cursor-pointer">
                            <i className="fa fa-paper-plane text-white text-opacity-70 text-lg"/>
                        </div>
                    </div>
                </div>
                <div className="h-[450px] overflow-auto p-2 pb-14 sm:pb-1">
                    {
                        comments.map(item => {
                            return (
                                <div key={item._id} className="flex justify-between">
                                    <div className="flex w-full">
                                        <div className="flex w-7">
                                            <img alt="comments" src={ item.user[0].pic } className="w-6 h-6 object-fill rounded-full"/>
                                        </div>
                                        <div className="ms-2 w-full">
                                            <div className="flex justify-between ">
                                                <p className="text-xs text-gray-300"><span className="flex items-center">{item.user[0].username} {item.user[0].verified && <img className="w-3 h-3 mx-1 mt-0.5 " src={ import.meta.env.VITE_VERIFY } /> } { getMoment(item.createdAt) }</span> </p>
                                                <div className="flex flex-col justify-center items-center">
                                                    <i onClick={async ()=> await manageCommentLike(item._id)} className={`cursor-pointer fa${item.likes.includes(userInfo._id) ? `s` : `r`} fa-heart text-xs`}/>    
                                                    <p className="text-[9px]">{item.likes.length}</p>
                                                </div>
                                            </div>
                                            <p className="text-xs mb-5 mt-[-8px] cursor-pointer">{item.message && <CreateMention text={item.message} />}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Comments
