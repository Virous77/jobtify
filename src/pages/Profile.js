import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "../styles/Profile.css";
import { selectUser, selectIsLoading, updateUser } from "../store/userSlice";

const Profile = () => {
  const userActive = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  //InitialState
  const initialState = {
    name: userActive.name || "",
    lastName: userActive.lastName || "",
    email: userActive.email || "",
    location: userActive.location || "",
  };

  const [user, setUser] = useState(initialState);

  //handle onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  //Submit changes
  const submitProfileForm = (e) => {
    e.preventDefault();

    const { name, lastName, email, location } = user;

    if (!name || !lastName || !email || !location) {
      toast.error("Please fill all fields! ");
      return;
    }

    dispatch(updateUser({ name, lastName, email, location }));
  };

  return (
    <section className="profileBar">
      <div className="profileHead">
        <h1>Profile</h1>
      </div>

      <form onSubmit={submitProfileForm}>
        <div className="wrap">
          <div className="formInput">
            <label name="name">Name</label>
            <input
              type="text"
              placeholder="name"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>

          <div className="formInput">
            <label name="name">Last name</label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="formInput">
            <label name="name">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className="formInput">
            <label name="name">Location</label>
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={user.location}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="formsButton">
          <button className="btn" disabled={isLoading}>
            {isLoading ? "Please wait.." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
