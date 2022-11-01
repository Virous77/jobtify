import React from "react";
import logo from "../assets/images/jogo4.jpg";
import mainImg from "../assets/images/mainImg.svg";
import "../styles/Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landingBar">
      <nav>
        <img src={logo} alt="Jobtify" />
      </nav>

      <div className="homeBox">
        <div className="leftBox">
          <div>
            <h1>Jobtify</h1>
            <span>A job tracking Platform</span>
          </div>

          <p>
            Jobtify makes it easy for businesses and workers alike! Easy for
            businesses to fill positions and workers to choose when and where
            they work.
          </p>
          <p>
            Your work is going to fill a large part of your life, and the only
            way to be truly satisfied is to do what you believe is great work.
            And the only way to do great work is to love what you do.
          </p>

          <div className="homeButton">
            <Link to="/register">
              <button className="btn">Login/Register</button>
            </Link>
          </div>
        </div>

        <div className="rightBox">
          <img src={mainImg} alt="Jobtify main" />
        </div>
      </div>
    </section>
  );
};

export default Landing;
