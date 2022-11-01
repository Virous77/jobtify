import React from "react";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectStats } from "../store/allJobSlice";
import "../styles/Stats.css";

const StatsContainer = () => {
  const stats = useSelector(selectStats);

  return (
    <section className="statsBar">
      <div className="pending">
        <div className="statsInfo">
          <h1>{stats.pending || 0}</h1>
          <FaSuitcaseRolling className="pendingIcon" />
        </div>
        <p>Pending Applications</p>
      </div>

      <div className="interview">
        <div className="statsInfo">
          <h1>{stats.interview || 0}</h1>
          <FaCalendarCheck className="interviewIcon" />
        </div>
        <p>interviews scheduled</p>
      </div>

      <div className="declined">
        <div className="statsInfo">
          <h1>{stats.declined || 0}</h1>
          <FaBug className="declinedIcon" />
        </div>
        <p>Jobs Declined</p>
      </div>
    </section>
  );
};

export default StatsContainer;
