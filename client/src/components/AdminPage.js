import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

export default function AdminAccount() {
  const [form, setForm] = useState({
    company: "",
    location: "",
    salary: null,
    description: "",
  });

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  function isValidUrl(text) {
    // Regular expression to match a URL pattern
    const urlRegex = /^(https?|ftp|file):\/\/\S+$/i;
    return urlRegex.test(text);
  }

  async function submit(e) {
    e.preventDefault();

    if (messages.length == 0) {
      toast.error("Atleast one product image is required");
    } else {
      try {
        await axios
          .post(`http://localhost:8000/adminUpdate`, {
            form,
            messages,
          })
          .then((res) => {
            if (res.data == "pass") {
              toast.success("Company added successfully");
            } else if (res.data == "fail") {
              toast.error("Something went wrong!");
            }
          })
          .catch((e) => {
            toast.error("Something went wrong carch!");
          });
      } catch (e) {
        toast.error("Something went wrong carch!");
      }
      setForm({ company: "", location: "", salary: "", description: "" });
      setMessage("");
      setMessages([]);
    }
  }

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const urlSend = (event) => {
    if (message == "") {
      toast.warn("URL cannot be empty");
    } else if (!isValidUrl(message)) {
      toast.error("It is not a valid URL");
    } else if (messages.length >= 6) {
      toast.error("Max 6 images are allowed");
    } else {
      setMessages([message, ...messages]);
      setMessage("");
    }
  };

  const handleDelete = (index) => {
    const newMessages = [...messages];
    newMessages.splice(index, 1);
    setMessages(newMessages);
  };

  const logOut = () => {
    Cookies.remove("email");
  };

  return (
    <div>
      <h1 className="text-3xl text-center mt-6">Admin Account</h1>

      <form method="/adminUpdate" action="POST" onSubmit={submit}>
        <section className="text-gray-600  mt-6 body-font grid place-items-center  relative  ">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col   mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-2xl mb-5 font-medium title-font">
              Add a Company here :
            </h2>

            <div className="relative mb-4">
              <label for="name" className="leading-7 text-sm text-gray-600">
                Name of the Company
              </label>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [e.target.name]: e.target.value,
                  })
                }
                required
                type="text"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label for="location" className="leading-7 text-sm text-gray-600">
                Location
              </label>
              <input
                value={form.location}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [e.target.name]: e.target.value,
                  })
                }
                required
                type="text"
                name="location"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label for="salary" className="leading-7 text-sm text-gray-600">
                Salary
              </label>
              <input
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [e.target.name]: e.target.value,
                  })
                }
                required
                type="number"
                name="salary"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                for="description"
                className="leading-7 text-sm text-gray-600"
              >
                description
              </label>
              <input
                value={form.stocks}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [e.target.name]: e.target.value,
                  })
                }
                required
                type="text"
                name="description"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label for="img" className="leading-7 text-sm text-gray-600">
                Enter image URL
              </label>
              <input
                value={message}
                onChange={handleChange}
                type="text"
                name="img"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button
              type="button"
              className="cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={urlSend}
            >
              Give the image URL
            </button>

            <br />
            <div>
              {messages.map((msg, index) => (
                <div key={index}>
                  {msg}
                  <button
                    type="button"
                    className="ml-2"
                    onClick={() => handleDelete(index)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <br />
                  <br />
                </div>
              ))}
            </div>

            <input
              className="cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              type="submit"
              value={"Submit"}
            />
          </div>
          <button
            onClick={logOut}
            class="mb-4 mt-4  text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
          >
            Log Out
          </button>
        </section>
      </form>
    </div>
  );
}
