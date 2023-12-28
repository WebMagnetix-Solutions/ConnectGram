import { Fragment } from "react"
import { useNavigate } from "react-router-dom"

const SideBar = () => {

    const currentPage = window.location.pathname
    const navigate = useNavigate()

    const handleSocket = () => {
        navigate("/messenger")
    }

    return (
        <Fragment>
            <div className="hidden sm:flex flex-col md:justify-around justify-center sm:col-span-1 text-xl md:text-base md:col-span-3 lg:col-span-2 h-screen bg-[#333] bg-opacity-30 w-full items-center">
                <div className="hidden md:flex px-3">
                    <img src="./logo.png" alt="logo"/>
                </div>
                <div className="w-full px-3 text-white">
                    <div onClick={() => { navigate("/") }} className={`flex bg-black ${currentPage =="/" ? `bg-opacity-30` : `bg-opacity-10`} items-center mb-4 md:mb-1 hover:text-black p-2 hover:bg-white rounded-full w-full justify-center md:ps-5 md:justify-start cursor-pointer transition-all duration-300`}>
                        <i className="fa fa-home md:mr-2"></i> <span className="hidden md:block">Home</span>
                    </div>
                    <div onClick={() => { navigate("/search") }} className={`flex bg-black ${currentPage =="/search" ? `bg-opacity-30` : `bg-opacity-10`} items-center mb-4 md:mb-1 hover:text-black p-2 hover:bg-white rounded-full w-full justify-center md:ps-5 md:justify-start cursor-pointer transition-all duration-300`}>
                        <i className="fa fa-search md:mr-2"></i> <span className="hidden md:block">Search</span>
                    </div>
                    <div onClick={() => { navigate("/new-post") }} className={`flex bg-black ${currentPage =="/new-post" ? `bg-opacity-30` : `bg-opacity-10`} items-center mb-4 md:mb-1 hover:text-black p-2 hover:bg-white rounded-full w-full justify-center md:ps-5 md:justify-start cursor-pointer transition-all duration-300`}>
                        <i className="far fa-square-plus md:mr-2"></i> <span className="hidden md:block">Post</span>
                    </div>
                    <div onClick={() => { handleSocket(); }} className={`flex bg-black bg-opacity-10 items-center mb-4 md:mb-1 hover:text-black p-2 hover:bg-white rounded-full w-full justify-center md:ps-5 md:justify-start cursor-pointer transition-all duration-300`}>
                        <i className="fab fa-facebook-messenger md:mr-2"></i> <span className="hidden md:block">Messages</span>
                    </div>
                    <div onClick={() => { navigate("/my-profile") }} className={`flex bg-black ${currentPage =="/my-profile" ? `bg-opacity-30` : `bg-opacity-10`} items-center mb-4 md:mb-1 hover:text-black p-2 hover:bg-white rounded-full w-full justify-center md:ps-5 md:justify-start cursor-pointer transition-all duration-300`}>
                        <i className="fa fa-user md:mr-2"></i> <span className="hidden md:block">Profile</span>
                    </div>
                </div>
            </div>

            <div className="w-screen sm:hidden bg-[#1c1c1c] text-white h-14 z-10 fixed bottom-0 flex text-xl">
                <div onClick={() => { navigate("/") }} className={`flex items-center bg-[#222] ${currentPage =="/" ? `bg-opacity-90` : `bg-opacity-0`} hover:text-black hover:bg-white rounded-full w-full justify-center cursor-pointer transition-all duration-300`}>
                    <i className="fa fa-home"></i>
                </div>
                <div onClick={() => { navigate("/search") }} className={`flex items-center hover:text-black bg-[#222] ${currentPage =="/search" ? `bg-opacity-90` : `bg-opacity-0`} hover:bg-white rounded-full w-full justify-center cursor-pointer transition-all duration-300`}>
                    <i className="fa fa-search"></i>
                </div>
                <div onClick={() => { navigate("/new-post") }} className={`flex items-center hover:text-black bg-[#222] ${currentPage =="/new-post" ? `bg-opacity-90` : `bg-opacity-0`} hover:bg-white rounded-full w-full justify-center cursor-pointer transition-all duration-300`}>
                    <i className="far fa-square-plus"></i>
                </div>
                <div onClick={() => { handleSocket(); }} className={`flex items-center hover:text-black hover:bg-white rounded-full w-full justify-center cursor-pointer transition-all duration-300`}>
                    <i className="fab fa-facebook-messenger"></i>
                </div>
                <div onClick={() => { navigate("/my-profile") }} className={`flex items-center hover:text-black bg-[#222] ${currentPage =="/my-profile" ? `bg-opacity-90` : `bg-opacity-0`} hover:bg-white rounded-full w-full justify-center cursor-pointer transition-all duration-300`}>
                    <i className="fa fa-user"></i>
                </div>
            </div>
        </Fragment>
    )
}

export default SideBar
