import { useNavigate } from "react-router-dom"

const Signup = () => {

    const navigate = useNavigate()

    return (
        <div className="w-screen h-screen px-2 md:px-0 flex justify-center items-center">
            <form className="w-full sm:bg-[#333] sm:bg-opacity-30 sm:w-[400px] rounded-xl p-5">
                <h1 className="font-bold text-2xl text-white text-center mb-4">Connect Gram</h1>
                <p className="text-gray-300 text-center mb-3">SignUp</p>
                
                <input type="text" name="name" placeholder="Name" className="w-full mb-4 text-white outline-none rounded-xl p-2 bg-[#111] bg-opacity-50 md:bg-[#222]" />
                <input type="text" name="username" placeholder="Username" className="w-full mb-4 text-white outline-none rounded-xl p-2 bg-[#111] bg-opacity-50 md:bg-[#222]" />
                <input type="text" name="email" placeholder="Email" className="w-full mb-4 text-white outline-none rounded-xl p-2 bg-[#111] bg-opacity-50 md:bg-[#222]" />
                <input type="password" name="password" placeholder="Password" className="w-full mb-4 text-white outline-none rounded-xl p-2 bg-[#111] bg-opacity-50 md:bg-[#222]" />
                <input type="password" name="confirm_password" placeholder="Confirm Password" className="w-full mb-4 text-white outline-none rounded-xl p-2 bg-[#111] bg-opacity-50 md:bg-[#222]" />
                <button className="bg-blue-900 text-white w-full p-1 rounded-xl bg-opacity-90 text-lg">Login</button>
                
                <div className="flex flex-col gap-2 text-white text-center mt-5">
                    <p>Already have an account? <span onClick={()=>navigate("/login")} className="cursor-pointer">Log In</span></p>
                </div>
            </form>
        </div>
    )
}

export default Signup
