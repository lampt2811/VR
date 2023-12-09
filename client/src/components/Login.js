import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import Cookies from "js-cookie";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
function Login() {
  const [captchaVal, setCaptchaVal] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (!captchaVal) {
        toast.error("Fill the Captcha");
      } else {
        await axios
          .post("http://localhost:8000/login", {
            form,
          })
          .then((res) => {
            if (res.data == "loginPass") {
              Cookies.set("email", form.email, { expires: 7 });
              toast.success("Successfully Registered");
            } else if (res.data == "nouser") {
              toast.error("this email is not registered");
            } else if (res.data == "loginFail") {
              toast.error("Invalid Credentials");
            } else if (res.data == "fail") {
              toast.error("Something went wrong!");
            }
          })
          .catch((e) => {
            toast.error("Something went wrong!");
          });
      }
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      Cookies.set("email", data.user.email, { expires: 7 });
    });
  };
  return (
    <div className="mb-6">
      <form action="POST" method="/login" onSubmit={submit}>
        <section class="text-gray-600 body-font relative grid place-items-center mt-10">
          <div class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
              Login
            </h2>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                value={form.name}
                onChange={(e) => {
                  setForm({
                    ...form,
                    [e.target.name]: e.target.value,
                  });
                }}
                required
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="password" class="leading-7 text-sm text-gray-600">
                Password
              </label>
              <input
                value={form.name}
                onChange={(e) => {
                  setForm({
                    ...form,
                    [e.target.name]: e.target.value,
                  });
                }}
                required
                type="password"
                id="password"
                name="password"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <ReCAPTCHA
              sitekey="6LeLRiopAAAAAB-klcQqCPRkm7jRL1lgdZQNvoWO"
              onChange={(value) => {
                setCaptchaVal(value);
              }}
            />
            <input
              className="mt-3 cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              type="submit"
              value={"Login"}
            />
            <p className="text-base text-blue-700 mt-3">
              <Link to={"/forgotpassword"}>Forgot Password</Link>
            </p>
            <input
              className=" mt-3 cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              type="submit"
              value={"Login with google"}
              onClick={() => handleClick()}
            />
            <p className="text-base mt-3">don't have an Account?</p>
            <p className="text-base text-blue-700 mt-3">
              <Link to={"/register"}>Register</Link>
            </p>
          </div>
        </section>
      </form>
    </div>
  );
}

export default Login;
