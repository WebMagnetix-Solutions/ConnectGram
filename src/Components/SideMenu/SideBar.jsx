import { Fragment } from "react"

const SideBar = () => {
    return (
        <Fragment>
            <div className="hidden sm:flex flex-col md:justify-around justify-center sm:col-span-1 text-xl md:text-base md:col-span-3 lg:col-span-2 h-screen bg-[#333] bg-opacity-30 w-full items-center">
                <div className="hidden md:flex">
                    <img src="./logo.png" alt="logo"/>
                </div>
                <div className="w-full px-3 text-white">
                    <div className="flex bg-black bg-opacity-10 items-center mb-4 md:mb-1 hover:text-black p-2 hover:bg-white rounded-full w-full justify-center md:ps-5 md:justify-start cursor-pointer transition-all duration-300">
                        <i className="fa fa-home md:mr-2"></i> <span className="hidden md:block">Home</span>
                    </div>
                    <div className="flex bg-black bg-opacity-10 items-center mb-4 md:mb-1 hover:text-black p-2 hover:bg-white rounded-full w-full justify-center md:ps-5 md:justify-start cursor-pointer transition-all duration-300">
                        <i className="fa fa-search md:mr-2"></i> <span className="hidden md:block">Search</span>
                    </div>
                    <div className="flex bg-black bg-opacity-10 items-center mb-4 md:mb-1 hover:text-black p-2 hover:bg-white rounded-full w-full justify-center md:ps-5 md:justify-start cursor-pointer transition-all duration-300">
                        <i className="far fa-square-plus md:mr-2"></i> <span className="hidden md:block">Post</span>
                    </div>
                    <div className="flex bg-black bg-opacity-10 items-center mb-4 md:mb-1 hover:text-black p-2 hover:bg-white rounded-full w-full justify-center md:ps-5 md:justify-start cursor-pointer transition-all duration-300">
                        <i className="fa fa-film md:mr-2"></i> <span className="hidden md:block">CG TV</span>
                    </div>
                    <div className="flex bg-black bg-opacity-10 items-center mb-4 md:mb-1 hover:text-black p-2 hover:bg-white rounded-full w-full justify-center md:ps-5 md:justify-start cursor-pointer transition-all duration-300">
                        <i className="fa fa-user md:mr-2"></i> <span className="hidden md:block">Profile</span>
                    </div>
                </div>
            </div>

            <div className="w-screen sm:hidden bg-[#1c1c1c] text-white h-14 absolute bottom-0 flex text-xl">
                <div className="flex items-center hover:text-black hover:bg-white rounded-full w-full justify-center cursor-pointer transition-all duration-300">
                    <i className="fa fa-home"></i>
                </div>
                <div className="flex items-center hover:text-black hover:bg-white rounded-full w-full justify-center cursor-pointer transition-all duration-300">
                    <i className="fa fa-search"></i>
                </div>
                <div className="flex items-center hover:text-black hover:bg-white rounded-full w-full justify-center cursor-pointer transition-all duration-300">
                    <i className="far fa-square-plus"></i>
                </div>
                <div className="flex items-center hover:text-black hover:bg-white rounded-full w-full justify-center cursor-pointer transition-all duration-300">
                    <i className="fa fa-film"></i>
                </div>
                <div className="flex items-center hover:text-black hover:bg-white rounded-full w-full justify-center cursor-pointer transition-all duration-300">
                    <i className="fa fa-user"></i>
                </div>
            </div>
        </Fragment>
    )
}

export default SideBar
