import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="sticky top-0 z-50">
      <header className="bg-slate-600 md:flex md:justify-between md:items-center md:px-4 md:py-0">
        <div className="flex items-center justify-between px-4 py-1 md:p-0">
          <div className=" w-11">
            <Link to={"/"}>VietRecruiment</Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              <i className="cursor-pointer ml-3 mr-2 fa-solid fa-bars scale-150"></i>
            </button>
          </div>
        </div>

        <nav
          className={` px-3 pt-1 pb-1 md:flex ${showMenu ? "block" : "hidden"}`}
        >
          <form id="search-form">
            <div className="relative flex mx-auto text-gray-600 ">
              <div className=" relative md:w-64 w-50 md:mr-4 mr-2 ">
                <input
                  type="text"
                  placeholder="Search"
                  id="footer-field"
                  name="footer-field"
                  className="h-8 w-full bg-gray-100  rounded border border-gray-300 focus:ring-2  focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-0 pl-2 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <button
                type="submit"
                className=" text-white bg-indigo-500  px-4 focus:outline-none hover:bg-indigo-600  cursor-pointer  border-gray-200  border-solid rounded-lg ml-0"
              >
                <i className="fa-solid fa-magnifying-glass w-[20px]"></i>
              </button>
            </div>
          </form>

          <Link
            className="block w-fit px-2 py-1 text-white font-semibold rounded hover:bg-gray-700 md:ml-4"
            to={"/login"}
          >
            Account/Login{" "}
          </Link>
          <a className="cursor-pointer block w-fit px-2 py-1 text-white font-semibold rounded hover:bg-gray-700 md:ml-4">
            Notification{" "}
          </a>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
