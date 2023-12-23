import ChatPage from "../../Pages/ChatPage"
import Feed from "../Feed/Feed"
import MyProfile from "../MyProfile/MyProfile"
import NewPost from "../NewPost/NewPost"
import Search from "../Search/Search"
import SinglePost from "../SinglePost/SinglePost"
import ViewUserProfile from "../ViewUserProfile/ViewUserProfile"

const Home = () => {

    const currentPage = window.location.pathname
    
    return (
        <div className={`col-span-12 sm:col-span-11 md:col-span-9 ${currentPage==="/new-post" ? `lg:col-span-10` : `lg:col-span-6`} mx-auto w-full flex justify-center`}>
            {
                currentPage === "/" ? <Feed /> :
                currentPage === "/search" ? <Search /> : 
                currentPage === "/new-post" ? <NewPost /> : 
                currentPage === "/my-profile" ? <MyProfile /> : 
                currentPage === "/post" ? <SinglePost /> : 
                currentPage === "/messenger" ? <ChatPage /> : 
                currentPage === "/user" ? <ViewUserProfile /> : null
            }
        </div>
    )
}

export default Home
