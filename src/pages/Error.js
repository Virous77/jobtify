import React from "react";
import notFound from "../assets/images/page not found1.svg";
import { Link } from "react-router-dom";
import "../styles/Error.css";

const Error = () => {
  return (
    <section className="pageNotFoundBar">
      <img src={notFound} alt="not found" />

      <div className="notFound">
        <p>Page Not found</p>
        <Link to="/">
          <button className="btn">Back Home</button>
        </Link>
      </div>
    </section>
  );
};

export default Error;
