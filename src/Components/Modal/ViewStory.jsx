/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom"
import { getMyData } from "../../Auth"
import { deleteSingleStory } from "../../Utils/api/story"
import moment from "moment"
import toast from "react-hot-toast"

const ViewStory = ({ selectedStory, setStories, setSelectedStory }) => {
    
    const userInfo = getMyData()
    const navigate = useNavigate()

    return (
        <div className={`flex cursor-pointer w-full sm:w-11/12 md:w-9/12 lg:w-6/12 absolute z-50 bg-black ${selectedStory?._id ? `pointer-events-auto bg-opacity-70` : `pointer-events-none bg-opacity-0`} justify-center h-screen duration-500 transition-all`}>
            <div className={`flex mx-10 justify-center items-center ${selectedStory?._id ? `opacity-100` : `opacity-0`} justify-center h-screen duration-500 transition-all`}>
                <img src={selectedStory.url} alt="story" className="rounded-xl"/>
                {userInfo._id === selectedStory?.user?.[0]._id && <p className="text-white top-2 absolute left-1/2 translate-x-[-50%]"><i className="fa fa-eye" /> {selectedStory?.views?.length}</p>}
                <div className="top-1 right-1 absolute flex gap-3">
                    {userInfo._id === selectedStory?.user?.[0]?._id && <p onClick={async () => {
                        toast.promise(deleteSingleStory(selectedStory?._id, userInfo._id), {
                            loading: "Deleting...",
                            success: (response) => {
                                if (response.result) {
                                    setStories(response.result)
                                    return "Story Deleted"
                                } else {
                                    return response.message
                                }
                            },
                            error: "Error happend"
                        })
                        setSelectedStory({})
                    }} className="text-white rounded-full w-8 h-8 flex justify-center items-center bg-red-600"><i className="fa fa-trash" /></p>}
                    <p onClick={()=>setSelectedStory({})} className="text-white rounded-full w-8 h-8 flex justify-center items-center bg-red-600"><i className="fa fa-close" /></p>
                </div>
                {selectedStory?._id && <div className="absolute text-sm top-1 left-1 flex items-center" onClick={() => navigate(`/user?username=${selectedStory?.user?.[0]?.username}`)}>
                    <img className="w-10 h-10 rounded-full mr-2" alt="profile" src={selectedStory?.user?.[0]?.pic} />
                    <span className="text-white">
                        <p className="text-xs">{selectedStory?.user?.[0]?.name}</p>
                        <p className="text-[10px]">{moment(selectedStory?.createdAt).fromNow()}</p>
                    </span>
                </div>}
            </div>
        </div>
    )
}

export default ViewStory
