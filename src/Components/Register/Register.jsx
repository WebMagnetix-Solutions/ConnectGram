import { useNavigate } from "react-router-dom"
import { userSignup } from "../../Utils/api/user"
import { useState } from "react"
import { registerValidation } from "../../Utils/Helper/Helper"
import toast from "react-hot-toast"
import ButtonLoader from "../ButtonLoader"

const Signup = () => {

    const [formData, setFormData] = useState(
        {
            name: "",
            username: "",
            email: "",
            password: "",
            confirm_password:""
        }
    )
    const [signupClicked, setSignupClicked] = useState(false)
    const [formError, setFormError] = useState({})
    const navigate = useNavigate()

    const updateForm = (key, value) => {
        if (key !== "confirm_password") {
            const response = registerValidation(key, value)
            setFormError(response)
        } else {
            if (formData.password !== value) {
                if (value.length > 0) {
                    setFormError({ confirm_password: "Passsword doen not match" })
                } else {
                    setFormError({confirm_password: null})
                }   
            } else {
                setFormError({confirm_password: null})
            }
        }
        setFormData({...formData, [key]: value})
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        if (!signupClicked) {
            setSignupClicked(true)
            const response = await userSignup(formData)
            if (response.result) {
                toast.success(response.message)
                const timeOut = setTimeout(() => {
                    clearTimeout(timeOut)
                    navigate("/login", {replace: true})
                }, 1500);
            } else {
                setSignupClicked(false)
                toast.error(response.message)
            }
        }
    }

    return (
        <div className="w-screen h-screen px-2 md:px-0 flex justify-center items-center">
            <form className="w-full sm:bg-[#333] sm:bg-opacity-30 sm:w-[400px] rounded-xl p-5" onSubmit={handleSignup}>
                <h1 className="font-bold text-2xl text-white text-center mb-4">Connect Gram</h1>
                <p className="text-gray-300 text-center mb-3">SignUp</p>
                
                <input type="text" name="name" value={formData.name} onChange={e => updateForm(e.target.name, e.target.value)} placeholder="Name" className="w-full text-white outline-none rounded-xl p-2 bg-[#111] bg-opacity-50 md:bg-[#222]" />
                {formError.name && <span className="text-xs text-red-500">{formError.name}</span>}
                <input type="text" name="username" value={formData.username} onChange={e => updateForm(e.target.name, e.target.value)} placeholder="Username" className="w-full mt-4 text-white outline-none rounded-xl p-2 bg-[#111] bg-opacity-50 md:bg-[#222]" />
                {formError.username && <span className="text-xs text-red-500">{formError.username}</span>}
                <input type="text" name="email" value={formData.email} onChange={e => updateForm(e.target.name, e.target.value)} placeholder="Email" className="w-full mt-4 text-white outline-none rounded-xl p-2 bg-[#111] bg-opacity-50 md:bg-[#222]" />
                {formError.email && <span className="text-xs text-red-500">{formError.email}</span>}
                <input type="password" name="password" value={formData.password} onChange={e => updateForm(e.target.name, e.target.value)} placeholder="Password" className="w-full mt-4 text-white outline-none rounded-xl p-2 bg-[#111] bg-opacity-50 md:bg-[#222]" />
                {formError.password && <span className="text-xs text-red-500">{formError.password}</span>}
                <input type="password" name="confirm_password" value={formData.confirm_password} onChange={e => updateForm(e.target.name, e.target.value)} placeholder="Confirm Password" className="w-full mt-4 text-white outline-none rounded-xl p-2 bg-[#111] bg-opacity-50 md:bg-[#222]" />
                {formError.confirm_password && <span className="text-xs text-red-500">{formError.confirm_password}</span>}
                <button className="bg-blue-900 mt-4 text-white w-full p-1 rounded-xl bg-opacity-90 text-lg">{signupClicked ? <ButtonLoader /> : "Register"}</button>
                
                <div className="flex flex-col gap-2 text-white text-center mt-5">
                    <p>Already have an account? <span onClick={()=>navigate("/login")} className="cursor-pointer">Log In</span></p>
                </div>
            </form>
        </div>
    )
}

export default Signup
