
const NoNetwork = () => {
    localStorage.setItem("lostInternet", null)
    return (
        <div className="flex justify-center text-white flex-col px-2 items-center animate-pulse h-screen w-screen cursor-not-allowed">
            <img alt="no imternet connection" src="../../No-internet-connection.png" className="mb-3"/>
            <p className="font-mono sm:text-xl text-center text-white">You are currently offline. Please check your internet connection.</p>
        </div>
    )
}

export default NoNetwork
