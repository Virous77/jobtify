import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Sidebar from "../components/layouts/Sidebar";
import BigSidebar from "../components/layouts/BigSidebar";
import "../styles/SharedLayout.css";
import { selectIsSidebarOpen } from "../store/userSlice";
import { useSelector } from "react-redux";

const SharedLayout = () => {
  const sidebartoggle = useSelector(selectIsSidebarOpen);

  return (
    <section className={sidebartoggle ? "singleBar" : "sharedBar"}>
      <div className="smallSide">{sidebartoggle && <Sidebar />}</div>

      <div className="bigSide">{!sidebartoggle && <BigSidebar />}</div>

      <div className="mainContent">
        <Navbar />
        <Outlet />
      </div>
    </section>
  );
};

export default SharedLayout;
