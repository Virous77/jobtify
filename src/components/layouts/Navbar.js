import React, { useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/Navbar.css";
import {
  selectUser,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  selectIsSidebarOpen,
} from "../../store/userSlice";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [showLogout, setShowLogout] = useState(false);
  const sideBar = useSelector(selectIsSidebarOpen);

  const toggle = () => {
    dispatch(TOGGLE_SIDEBAR());
  };

  const logout = () => {
    dispatch(LOGOUT_USER());
    setShowLogout(false);

    setTimeout(() => {
      toast.success("Logout has been successful!");
    }, 1000);
  };

  return (
    <header>
      <nav className={sideBar ? "navbars" : "navbar"}>
        <div className="togglePage">
          <FaAlignLeft className="toggleIcon" onClick={toggle} />
        </div>

        <div className="navTitle">
          <h2>Dashboard</h2>
        </div>

        <div className="userNav" onClick={() => setShowLogout(!showLogout)}>
          <FaUserCircle className="circleIcon" />
          <span>{user?.name}</span>
          <FaCaretDown className="dropIcon" />
        </div>

        {showLogout && (
          <div className="logout">
            <button onClick={logout}>
              Logout
              <FiLogOut />
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
