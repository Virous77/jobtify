import React from "react";
import logo from "../../assets/images/jogo4.jpg";
import { NavLink } from "react-router-dom";
import { navLinks } from "../../utils/link";
import "../../styles/Sidebar.css";
import { IoMdClose } from "react-icons/io";
import { TOGGLE_SIDEBAR } from "../../store/userSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(TOGGLE_SIDEBAR());
  };

  return (
    <aside className="smallSidebar">
      <div className="smallHome">
        <img src={logo} alt="logo" />

        <IoMdClose className="closeIcon" onClick={toggle} />
      </div>

      <div className="smallNavlinkList">
        {navLinks.map((link) => (
          <NavLink to={link.value} key={link.id} onClick={toggle}>
            <div className="smallNavLink">
              <p className="icons">{link.icon}</p>
              <p className="navName">{link.name}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
