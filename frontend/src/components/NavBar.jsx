import React from "react";
import { Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import Logo from "../images/Logo.jpeg";
import { FaUserAlt } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="bg-navy text-white shadow-md">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo with responsive sizing */}
            <img
              src={Logo}
              alt="logo"
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
            />
            <Link
              to="/"
              className="text-lg sm:text-xl lg:text-2xl ml-2 font-bold"
            >
              DoCo Bank!
            </Link>
          </div>

          <div className="flex text-end items-center gap-4 sm:gap-6">
            {/* Home icon with responsive sizing */}
            <Link
              to="/"
              className="text-2xl sm:text-3xl lg:text-4xl hover:text-teal-200 transition ease-in-out duration-500"
            >
              <FaHome />
            </Link>

            {/* Profile icon with responsive sizing */}
            <Link
              to="/ViewUserDetails"
              className="text-xl sm:text-2xl lg:text-3xl hover:text-teal-200 transition ease-in-out duration-500"
            >
              <FaUserAlt />
            </Link>

            {/* Login icon with responsive sizing */}
            <Link
              to="/login"
              className="text-2xl sm:text-3xl lg:text-4xl hover:text-teal-200 transition ease-in-out duration-500"
            >
              <IoMdLogIn />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
