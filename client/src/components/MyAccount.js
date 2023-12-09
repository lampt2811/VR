import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function MyAccount() {
  const cookieVal = Cookies.get("email");
  const [name, setName] = useState("");
  const logOut = () => {
    Cookies.remove("email");
  };

  const submit = async (e) => {
    try {
      await axios
        .post("http://localhost:8000/myaccount", {
          cookieVal,
        })
        .then((res) => {
          setName(res.data);
        })
        .catch((e) => {
          toast.error("Something went wrong!");
        });
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    submit();
  }, [cookieVal]);

  return (
    <div>
      <section className="text-gray-600 grid place-items-center my-6">
        <h1 className="sm:text-4x1 text-3x1 mb-4 font-medium text-gray-950">
          Hello {name}
        </h1>
        <p className="mb-8">Your Email ID : {cookieVal}</p>
        <div className="p-4 w-full flex flex-wrap justify-center">
          <Link
            to="/jobs"
            className="cursor-pointer  w-fit m-4 hover:shadow-lg border-2 text-center  border-gray-200 px-4 py-2 lg:py-6 lg:px-10 rounded-lg"
          >
            <i className="fa-solid fa-box text-3xl lg:text-5xl"></i>
            <h2 className="title-font font-medium text-lg lg:text-2xl mt-4 text-gray-900">
              Your Jobs
            </h2>
          </Link>
        </div>
        <button
          onClick={logOut}
          className="ml-4  text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
        >
          Log Out
        </button>
      </section>
    </div>
  );
}

export default MyAccount;
