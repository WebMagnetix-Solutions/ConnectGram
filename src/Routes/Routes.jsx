import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainPage from "../Pages/MainPage"
import LoginPage from "../Pages/LoginPage"
import SignupPage from "../Pages/SignupPage"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" Component={LoginPage} />
                <Route path="/signup" Component={SignupPage} />
                <Route exact path="/" Component={MainPage}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter