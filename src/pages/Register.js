import React, { useState, useEffect } from "react";
import "../styles/Register.css";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectIsLoading,
  loginUser,
  registerUser,
} from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [user, setUser] = useState(initialState);

  const dipatch = useDispatch();
  const navigate = useNavigate();
  const activeUser = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  //Register/Login user Form
  const formSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = user;

    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Fill All fields ");
      return;
    }

    if (isMember) {
      dipatch(loginUser({ email, password }));
      return;
    }
    dipatch(registerUser({ email, name, password }));
  };

  //Navigate to Dashboard
  useEffect(() => {
    if (activeUser) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [activeUser, navigate]);

  return (
    <section className="registerBar">
      <motion.div
        className="register"
        whileInView={{ opacity: [0, 1], scale: [0, 1] }}
        transition={{ duration: 1 }}
      >
        <h1>Jobtify</h1>
        <span>{user.isMember ? "Login" : "Register"}</span>

        <form onSubmit={formSubmit}>
          {!user.isMember && (
            <div className="formInput">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="formInput">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className="formInput">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <div className="formButton">
            <button disabled={isLoading}>
              {isLoading ? "Processing..." : "Submit"}
            </button>
          </div>

          <div className="formButton">
            <button disabled={isLoading}
            type='button'
            onClick={() => {
              dipatch(loginUser({email: 'testUser@test.com', password: 'secret'}))
            }}
            >
              {isLoading ? "Processing..." : "Demo"}
            </button>
          </div>
        </form>

        <div className="toggleRegister">
          <p>
            {user.isMember ? "Not" : "Already"} a member?
            <b onClick={() => setUser({ ...user, isMember: !user.isMember })}>
              {!user.isMember ? "Login" : "Register"}
            </b>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Register;
