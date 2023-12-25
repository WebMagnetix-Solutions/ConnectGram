/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { getMe } from "../../Utils/api/user"
import { createStory, getStories, updateStoryView } from "../../Utils/api/story"

const Stories = ({userInfo, stories, setStories, setSelectedStory}) => {

    const [myData, setMyData] = useState({})
    const [storyMedia, setStoryMedia] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMe(userInfo._id)
            if (response.result) {
                setMyData(response.result)
            } else {
                toast.error(response.message)
            }
        }
        fetchData()
    }, [])

    const handleConfirmation = async (value) => {
        if (!value) {
            setStoryMedia("")
            return toast.error("Cancelled!")
        }
        const formBody = new FormData()
        formBody.append("posted_by", myData._id)
        formBody.append("file", storyMedia)
        toast.promise(createStory(formBody), {
            loading: "Story uploading...",
            success: (response) => {
                if (response.result) {
                    stories.unshift(response.result)
                    setStories(stories)
                    setStoryMedia("")
                    return "Story updated"
                } else {
                    return response.message
                }
            },
            error: (response) => {
                return response
            }
        })
    }

    const selectStory = async (item) => {
        const response = await getStories(userInfo._id)
        if (!response.result) {
            return toast.error(response.message)
        }
        const findIndex = response.result.find(items => items._id === item._id)
        const findIndexExist = response.result.find(item => item.posted_by === userInfo._id)
        if (findIndexExist) {
            response.result.splice(response.result.indexOf(findIndexExist), 1)
            response.result.unshift(findIndexExist)
        }
        setStories(response.result)
        if (!findIndex) {
            return toast.error("Story expired or deleted!")
        }
        if (item?.user?.[0]?._id !== userInfo._id) {
            if (!item.views.includes(userInfo._id)) {
                const response = await updateStoryView(item._id, userInfo._id)
                if (!response?.result) {
                    return toast.error(response.message)
                } else {
                    setStories(stories.map(items => {
                        if (items._id === item._id) {
                            return {...items, views: [...items.views, userInfo._id]}
                        }
                        return items
                    }))
                }
            }
        }
        setSelectedStory(item)
    }

    return (
        <Fragment>
            <div className="bg-[#333] bg-opacity-30 rounded-xl overflow-auto inline-block whitespace-nowrap pt-2 pb-1 px-1 w-full cursor-pointer">
                <label className={`shadow cursor-pointer shadow-black relative w-16 h-16 inline-block rounded-full mr-2`}>
                    <i className="fa fa-plus absolute text-blue-800 font-extrabold top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"/>
                    <img alt="MyImage" src={storyMedia ? URL.createObjectURL(storyMedia) : myData.pic} className="rounded-full w-16 h-16 object-fill opacity-20" />
                    <input type="file" onChange={(e) => {
                        const file = e.target.files[0]
                        if (file.type.split("/")[0] !== "image") {
                            return toast.error("Only image stories enabled now")
                        }
                        setStoryMedia(file)
                    }} className="hidden" />
                    <p className="text-[10px] text-center text-white mt-1 w-16 overflow-scroll">{ myData.name }</p>
                </label>
                {
                    stories.map((item, index) => {
                        return (
                            <div onClick={async ()=>await selectStory(item)} key={item._id} className={`shadow border-2 ${item.user?.[0]?._id===userInfo._id ? `border-white` : item.views.includes(userInfo._id) ? `border-red-600` : `border-green-700`} relative shadow-black w-16 h-16 inline-block rounded-full ${stories.length!==index+1 && `mr-2`}`}>
                                <img src={item.user?.[0]?.pic} className="rounded-full object-fill z-10" />
                                <p className="text-[10px] text-center text-white mt-1 w-16 overflow-scroll">{ item.posted_by===userInfo._id ? userInfo.name : item.user?.[0]?.name }</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className={`bg-[#333] z-10 bg-opacity-30 rounded-xl flex flex-col pt-2 pb-1 px-1 w-full cursor-pointer ${!storyMedia && "hidden"} transition-all duration-500`}>
                <p className="text-center text-white mb-2">Are you sure to send this story?</p>
                <div className="flex justify-evenly gap-5">
                    <button className="p-1 w-full bg-red-500 rounded-xl bg-opacity-60 text-white" onClick={()=>handleConfirmation(0)}>Cancel</button>
                    <button className="p-1 w-full bg-green-500 rounded-xl bg-opacity-60 text-white" onClick={() => handleConfirmation(1)}>Send</button>
                </div>
            </div>
        </Fragment>
    )
}

export default Stories
