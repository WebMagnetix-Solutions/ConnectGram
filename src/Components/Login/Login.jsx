import { useNavigate } from "react-router-dom"
import { userLogin } from "../../Utils/api/user"
import { setAuth } from "../../Auth"
import { useState } from "react"
import toast from "react-hot-toast"

const Login = () => {

    const [formData, setFormData] = useState(
        {
            username: "",
            password: ""
        }
    )

    const navigate = useNavigate()

    const updateForm = (key, value) => {
        setFormData({...formData, [key]: value})
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const response = await userLogin(formData)
        if (response.token) {
            setAuth(response.token, response.user)
            navigate("/", {replace: true})
        } else {
            toast.error(response)
        }
    }

    return (
        <div className="w-screen h-screen px-2 md:px-0 flex justify-center items-center">
            <form className="w-full sm:bg-[#333] sm:bg-opacity-30 sm:w-[400px] rounded-xl p-5" onSubmit={handleLogin}>
                <h1 className="font-bold text-2xl text-white text-center mb-4">Connect Gram</h1>
                <p className="text-gray-300 text-center mb-3">SignIn</p>
                <input type="text" name="username" value={formData.username} onChange={e => updateForm(e.target.name, e.target.value)} placeholder="Username" className="w-full mb-4 text-white outline-none rounded-xl p-2 bg-[#111] bg-opacity-50 md:bg-[#222]" />
                <input type="password" name="password" value={formData.password} onChange={e => updateForm(e.target.name, e.target.value)} placeholder="Password" className="w-full mb-4 text-white outline-none rounded-xl p-2 bg-[#111] bg-opacity-50 md:bg-[#222]" />
                <button className="bg-blue-900 text-white w-full p-1 rounded-xl bg-opacity-90 text-lg">Login</button>
                <div className="flex flex-col gap-2 text-white text-center mt-5">
                    <p>Don{`'`}t have an account? <span className="cursor-pointer" onClick={()=>navigate("/signup")}>Register</span></p>
                    <p>Don{`'`}t remember password? <span className="cursor-pointer">Reset here</span></p>
                </div>
            </form>
        </div>
    )
}

export default Login
