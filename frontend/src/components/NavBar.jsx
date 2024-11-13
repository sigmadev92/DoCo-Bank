import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { FaHome, FaUserAlt } from "react-icons/fa";
import Logo from "../images/Logo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { deleteAuth } from "../redux/slices/userSlice";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState("/");

  const user = useSelector((state) => state.user);

  const handleNavigate = (path) => {
    setActive(path);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(deleteAuth());
    handleNavigate("/login");
  };

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
            {/* Home icon */}
            <Link
              to="/"
              className={`text-2xl sm:text-3xl lg:text-4xl transition ease-in-out duration-500 ${
                active === "/" ? "text-teal-200" : "hover:text-teal-200"
              }`}
              onClick={() => handleNavigate("/")}
            >
              <FaHome />
            </Link>

            {user.loggedIn ? (
              <>
                {/* Profile icon - Only show if logged in */}
                <Link
                  to="/ViewUserDetails"
                  className={`text-xl sm:text-2xl lg:text-3xl transition ease-in-out duration-500 ${
                    active === "/ViewUserDetails"
                      ? "text-teal-200"
                      : "hover:text-teal-200"
                  }`}
                  onClick={() => handleNavigate("/ViewUserDetails")}
                >
                  <FaUserAlt />
                </Link>

                {/* Logout icon - Only show if logged in */}
                <button
                  className={`text-2xl sm:text-3xl lg:text-4xl transition ease-in-out duration-500 ${
                    active === "/login"
                      ? "text-teal-200"
                      : "hover:text-teal-200"
                  }`}
                  onClick={handleLogout}
                >
                  <IoMdLogOut />
                </button>
              </>
            ) : (
              // Login icon - Only show if not logged in
              <Link
                to="/login"
                className={`text-2xl sm:text-3xl lg:text-4xl transition ease-in-out duration-500 ${
                  active === "/login" ? "text-teal-200" : "hover:text-teal-200"
                }`}
                onClick={() => handleNavigate("/login")}
              >
                <IoMdLogIn />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
