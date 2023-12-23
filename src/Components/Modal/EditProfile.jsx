/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { profileEdit } from "../../Utils/api/user"
import toast from "react-hot-toast"
import { removeAuth } from "../../Auth"
import { useNavigate } from "react-router-dom"

const EditProfile = ({ setMyData, myData, setEdit, isEdit }) => {

    const [formData, setFormData] = useState({ name: "", username: "", pic: "", bio: "" })
    const navigate = useNavigate()
    
    const setDefault = () => {
        setFormData({
            name: myData.name,
            username: myData.username,
            pic: myData.pic,
            bio: myData.bio
        })
    }

    const handleFormData = async (e) => {
        e.preventDefault()
        const newForm = new FormData()
        if (formData.name.length < 4) {
            toast.error("Name should be atleast 4 letters")
            return
        }
        if (formData.username.length < 4) {
            toast.error("Username should be atleast 4 letters")
            return
        }
        if (formData.bio && formData.bio.length < 10) {
            toast.error("Bio should be atleast 10 letters")
            return
        }
        if (myData.name !== formData.name ) {
            newForm.append("name", formData.name)
        }
        if (myData.username !== formData.username) {
            newForm.append("username", formData.username)
        }
        if (formData.pic?.name) {
            newForm.append("pic", formData.pic)
        }
        newForm.append("id", myData._id)
        if (formData.bio && myData.bio !== formData.bio ) {
            newForm.append("bio", formData.bio)
        }
        const response = await profileEdit(newForm)
        if (response.result) {
            setMyData(response.result)
            setEdit(false)
        } else {
            if (response === 401) {
                removeAuth()
                navigate("/login")
            } else {
                toast.error(response)
            }
        }
    }

    useEffect(() => {
        setDefault()
    }, [])

    return (
        <div className={`flex absolute z-50 justify-center h-screen duration-500 transition-all ${isEdit ? `bg-black bg-opacity-40` : `bg-none bg-opacity-0 pointer-events-none`}`}>
            <div className={` mt-10 px-5 w-full absolute duration-500 transition-all ${isEdit ? `top-0` : `top-[-50rem]`} sm:w-[500px]`}>
                <form onSubmit={handleFormData} className="w-full p-3 bg-[#222] shadow text-white shadow-black rounded-3xl">
                    <h1 className="text-lg text-center">Edit Profile</h1>
                    <label className="mt-5 cursor-pointer relative flex justify-center mb-4">
                        <img src={formData.pic?.name ? URL.createObjectURL(formData.pic) : formData.pic} alt={formData.username} className="w-20 h-20 rounded-full" />
                        <input type="file" className="hidden" name="file" onChange={(e)=>setFormData({...formData, pic: e.target.files[0]})}/>
                    </label>
                    <input value={formData.name} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} name="name" placeholder="Name" className="outline-none p-2 mb-2 bg-[#1c1c1c] rounded-xl w-full" />
                    <input value={formData.username} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} name="username" placeholder="Username" className="outline-none p-2 mb-2 bg-[#1c1c1c] rounded-xl w-full" />
                    <textarea placeholder="Bio" value={formData.bio} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} name="bio" className="outline-none p-2 mb-2 bg-[#1c1c1c] rounded-xl w-full resize-none" rows={4}></textarea>
                    <div className="flex justify-center w-full gap-4">
                        <button className="w-full bg-violet-900 p-1 rounded-xl">Update</button>
                        <button type="button" className="w-full bg-red-900 p-1 rounded-xl" onClick={() => { setDefault(); setEdit(false) }}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile
