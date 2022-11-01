import React from "react";
import "../../styles/Bigsidebar.css";
import { NavLink } from "react-router-dom";
import { navLinks } from "../../utils/link";
import logo from "../../assets/images/jogo4.jpg";
import { motion } from "framer-motion";

const BigSidebar = () => {
  return (
    <aside className="bigsidebar">
      <div className="bigHome">
        <img src={logo} alt="logo" />
      </div>

      <div className="bigNavlinkList">
        {navLinks.map((link) => (
          <NavLink to={link.value} key={link.id}>
            <motion.div className="bigNavLink" whileHover={{ scale: 1.04 }}>
              <p className="icons">{link.icon}</p>
              <p className="navName">{link.name}</p>
            </motion.div>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default BigSidebar;
