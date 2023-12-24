
const NoNetwork = () => {
    localStorage.setItem("lostInternet", null)
    return (
        <div className="flex justify-center text-white flex-col px-2 items-center animate-pulse h-screen w-screen cursor-not-allowed">
            
        </div>
    )
}

export default NoNetwork
