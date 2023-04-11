import { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import NotFound from "./pages/NotFound";

function App() {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));
    //This function calls dispatch(setUser), which sets the value of user from JSON parsed from localStorage.

    useEffect(() => {
        dispatch(setUser(user));
    }, []);
    //This function calls dispatch(setUser), which sets the value of user from JSON parsed from localStorage.
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
