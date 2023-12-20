import Home from "../Home/Home"
import HomeSuggestions from "../HomeSuggestions/HomeSuggestions"
import SideBar from "../SideMenu/SideBar"

const Main = () => {

    

    return (
        <div className="grid grid-cols-12 w-screen h-screen">
            <SideBar />
            <Home />
            <HomeSuggestions />
        </div>
    )
}

export default Main
