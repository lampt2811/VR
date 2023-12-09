import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import MyAccount from "./components/MyAccount";
import Register from "./components/Register";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AdminPage from "./components/AdminPage";

function App() {
  const [cookieVal, setCookieVal] = useState(Cookies.get("email"));

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCookie = Cookies.get("email");
      if (updatedCookie !== cookieVal) {
        setCookieVal(updatedCookie);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [cookieVal]);

  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Navbar />
        <Routes>
          {cookieVal == undefined && (
            <Route path="/login" element={<Login />} />
          )}
          {cookieVal == "admin@mail.com" && (
            <Route path="/login" element={<AdminPage />} />
          )}
          {cookieVal != undefined && cookieVal != "admin@mail.com" && (
            <Route path="/login" element={<MyAccount />} />
          )}
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
