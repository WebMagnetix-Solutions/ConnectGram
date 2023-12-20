import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainPage from "../Pages/MainPage"
import LoginPage from "../Pages/LoginPage"
import SignupPage from "../Pages/SignupPage"
import { Authentication } from "../ProtectedRoute"

const AppRouter = () => {

    const commonPath = ["/", "/search", "/new-post", "/my-profile"]

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Authentication login><LoginPage/></Authentication>} />
                <Route path="/signup" element={<Authentication register><SignupPage/></Authentication>} />
                {
                    commonPath.map(item => ( <Route exact key={item} path={item} element={<Authentication><MainPage /></Authentication>} /> ))
                }
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter