import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import "../styles/Job.css";
import moment from "moment";
import { deleteJob, EDIT_JOB } from "../store/jobSlice";

const Job = (job) => {
  const { _id, position, company, jobLocation, jobType, createdAt, status } =
    job;
  const dispatch = useDispatch();

  const deleteButton = (id) => {
    dispatch(deleteJob(id));
  };

  const editButton = (id) => {
    dispatch(
      EDIT_JOB({
        editJobId: id,
        position,
        company,
        jobLocation,
        jobType,
        status,
      })
    );
  };

  const date = moment(createdAt).format("MM Do, YYYY");
  return (
    <section className="jobBar">
      <div className="topBar">
        <div className="jobLogo">{company?.charAt(0)}</div>

        <div className="jobTitle">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </div>

      <div className="contentBar">
        <div className="location">
          <p>
            <FaLocationArrow />
            <span>{jobLocation}</span>
          </p>
        </div>

        <div className="location">
          <p>
            <FaCalendarAlt />
            <span>{date}</span>
          </p>
        </div>

        <div className="location">
          <p>
            <FaBriefcase />
            <span>{jobType}</span>
          </p>
        </div>

        <div className="jobStatus">
          <p
            className={
              status === "declined"
                ? "dec"
                : status === "interview"
                ? "int"
                : status === "pending"
                ? "pend"
                : ""
            }
          >
            {status}
          </p>
        </div>
      </div>

      <div className="jobAction">
        <div className="edit">
          <Link to="/add-job">
            <button onClick={() => editButton(_id)}>Edit</button>
          </Link>
        </div>

        <div className="delete">
          <button onClick={() => deleteButton(_id)}>Delete</button>
        </div>
      </div>
    </section>
  );
};

export default Job;
