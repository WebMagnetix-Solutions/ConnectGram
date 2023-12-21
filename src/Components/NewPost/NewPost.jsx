import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { createPost } from "../../Utils/api/post"
import { getMyData } from "../../Auth"
import { useNavigate } from "react-router-dom"

const NewPost = () => {

    const [postFile, setPostFile] = useState(null)
    const [tag, setTag] = useState("")
    const [formData, setFormData] = useState({ caption: "", tags: [], location: "" })
    
    const navigate = useNavigate()

    useEffect(() => {
        
        if (postFile) {
            if (postFile.type.split("/")[0] === "video") {
                const video = document.createElement('video');
                video.preload = 'metadata';
                video.onloadedmetadata = () => {
                    if (video.duration > 30) {
                        toast.error("Video length should be less or equal to 30s")
                        setPostFile(null)
                    }
                };
                video.src = URL.createObjectURL(postFile);
            } else {
                if (postFile.size / (1024 * 1024) > 5) {
                    toast.error("Image should be less than 5MB")
                    setPostFile(null)
                }
            }
        }
        
    }, [postFile])

    const setFormChange = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }

    const addTag = () => {
        if (formData.tags.length == 10) {
            toast.error("Max tags reached!")
            return
        }
        if (formData.tags.some(item => item.toLowerCase()  === `#${ tag.toLowerCase()}`)) {
            toast.error("Tag already exist!")
            return
        } else {
            setFormData({ ...formData, tags: [...formData.tags, `#${tag}`] })
            setTag("")
        }
    }

    const removeTag = (item) => {
        setFormData({ ...formData, tags: formData.tags.filter(items=>items!==item) })
    }

    const handleNewPost = async (e) => {
        e.preventDefault()
        if (!postFile) {
            toast.error("File not found!")
            return
        }
        if (formData.tags.length == 0) {
            toast.error("Add atleast one tag")
            return
        }
        const formBody = new FormData()
        for (const key in formData) {
            formBody.append(key, formData[key])   
        }
        const posted_by = getMyData()
        formBody.append("posted_by", posted_by._id)
        formBody.append("file", postFile)
        toast.promise(createPost(formBody),
            {
                loading: 'Uploading...',
                success: (response) => {
                    if (response.result) {
                        setTimeout(() => {
                            navigate("/")
                        }, 1000);
                        return "Uploaded"
                    }
                },
                error: <b>Could not Upload.</b>,
            }
        );
    }

    return (
        <div className="w-full h-screen overflow-y-auto pb-16 sm:pb-4">
            <div className="flex lg:flex-row flex-col justify-between w-full px-2 sm:px-6 lg:px-0">
                <label className="w-full justify-center flex relative cursor-pointer mt-6 rounded-xl">
                    {!postFile && <img alt="not selected" src="./no-image.png"/>}
                    {postFile && postFile.type.split("/")[0] === "image" && <img src={URL.createObjectURL(postFile)} alt="select image" className="w-96 md:w-[500px] lg:w-[370px] xl:w-[450px] object-contain rounded-xl" />}
                    {postFile && postFile.type.split("/")[0] === "video" && <video autoPlay src={URL.createObjectURL(postFile)} alt="select video" className="w-96 md:w-[500px] lg:w-[370px] xl:w-[450px] object-contain rounded-xl" />}
                    <input type="file" className="hidden absolute" onChange={e => setPostFile(e.target.files[0])}/>
                </label>
                <div className="w-full flex justify-center mr-10 sm:mt-10">
                    <form className="w-full text-white" onSubmit={handleNewPost}>
                        <h1 className="mb-6 mt-7 text-xl">Post Information</h1>
                        <label className="text-opacity-50 text-white">Caption</label>
                        <textarea type="text" name="caption" value={formData.caption} onChange={e=>setFormChange(e.target.name, e.target.value)} className="resize-none p-3 outline-none bg-[#111] bg-opacity-30 mb-2 rounded-xl w-full" rows={5} />
                        <label className="text-opacity-50 text-white">Tags {tag.length>=4 && "( Click on tick )"}</label>
                        <div className="relative">
                            <input type="text" value={tag} onChange={e=>/^[a-zA-Z0-9]{0,30}$/.test(e.target.value) && setTag(`${e.target.value.trim()}`)} className="p-3 outline-none bg-[#111] mb-2 bg-opacity-30 rounded-xl w-full" />
                                {
                                    tag.length>=4 && <div onClick={addTag} className="p-3 w-7 h-7 flex justify-center items-center cursor-pointer bg-green-900 absolute top-2.5 right-2.5 rounded-full">
                                        <i className="fa fa-check"></i>
                                    </div>
                                }
                        </div>
                            {
                                formData.tags.length > 0 && <div className="flex flex-row flex-wrap gap-2 mb-3">
                                {
                                    formData?.tags.map((item, index) => {
                                        return (
                                            <div className="p-1 px-2 flex items-center bg-black relative bg-opacity-30 rounded-full" key={index}>
                                                {item}
                                                <i className="fa fa-close text-red-700 ms-2 cursor-pointer" onClick={()=>removeTag(item)}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            }
                        
                        <label className="text-opacity-50 text-white">Location</label>
                        <input type="text" name="location" value={formData.location} onChange={e=>setFormChange(e.target.name, e.target.value)} className="p-3 outline-none bg-[#111] bg-opacity-30 rounded-xl w-full" />
                        <button type="submit" className="bg-violet-900 p-1 w-full rounded-xl mt-5">Post <i className="fa fa-paper-plane"/></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewPost
