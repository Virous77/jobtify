import React from "react";
import { BiLoader } from "react-icons/bi";
import "../UI/Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <BiLoader className="loadIcon" />
    </div>
  );
};

export default Loader;
