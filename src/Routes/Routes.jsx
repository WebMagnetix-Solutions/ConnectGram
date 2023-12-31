import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainPage from "../Pages/MainPage"
import LoginPage from "../Pages/LoginPage"
import SignupPage from "../Pages/SignupPage"
import { Authentication } from "../ProtectedRoute"
import Page404 from "../Components/Page404"
import NoNetwork from "../Components/NoNetwork"
import UserVerify from "../Components/UserVerify"

const AppRouter = () => {

    const commonPath = ["/", "/search", "/new-post", "/my-profile", "/post", "/messenger", "/user"]
    const route = localStorage.getItem("lostInternet")

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Authentication login><LoginPage/></Authentication>} />
                <Route path="/signup" element={<Authentication register><SignupPage/></Authentication>} />
                {
                    commonPath.map(item => ( <Route exact key={item} path={item} element={<Authentication><MainPage /></Authentication>} /> ))
                }
                <Route path="/verify/:id" Component={UserVerify}/>
                <Route path={`/lost/connection/${route}`} Component={NoNetwork} />
                <Route path="*" Component={Page404}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter