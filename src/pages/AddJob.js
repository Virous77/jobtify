import React, { useEffect } from "react";
import {
  HANDLE_CHANGE,
  CLEAR_VALUE,
  createJob,
  editJob,
} from "../store/jobSlice";
import { useSelector, useDispatch } from "react-redux";
import { jobTypes, jobStatus } from "../utils/link";
import { toast } from "react-toastify";
import { selectUser } from "../store/userSlice";
import "../styles/AddJob.css";

const AddJob = () => {
  const user = useSelector(selectUser);

  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    status,
    isEditing,
    editJobId,
  } = useSelector((store) => store.createJob);
  const dispatch = useDispatch();

  //Catch change
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(HANDLE_CHANGE({ name, value }));
  };

  //Submit job
  const submitJobForm = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error("Please fill all the fields!");
    }

    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
    } else {
      dispatch(createJob({ position, company, jobLocation, jobType, status }));
    }
  };

  //Clear job
  const clearFields = () => {
    dispatch(CLEAR_VALUE());
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(HANDLE_CHANGE({ name: "jobLocation", value: user.location }));
    }
  }, []);

  return (
    <section className="profileBar">
      <div className="profileHead">
        <h1>{isEditing ? "Edit Job" : "Add Job"}</h1>
      </div>

      <form onSubmit={submitJobForm}>
        <div className="wrap">
          <div className="formInput">
            <label name="position">Position</label>
            <input
              type="text"
              placeholder="Position"
              name="position"
              value={position}
              onChange={handleChange}
            />
          </div>

          <div className="formInput">
            <label name="company">Company</label>
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={company}
              onChange={handleChange}
            />
          </div>

          <div className="formInput">
            <label name="jobLocation">Job Location</label>
            <input
              type="text"
              placeholder="Job Location"
              name="jobLocation"
              value={jobLocation}
              onChange={handleChange}
            />
          </div>

          <div className="formInput">
            <label name="status">Status</label>
            <select name="status" value={status} onChange={handleChange}>
              {jobStatus.map((job) => (
                <option value={job.value} key={job.id}>
                  {job.name}
                </option>
              ))}
            </select>
          </div>

          <div className="formInput">
            <label name="jobType">Job Type</label>
            <select name="jobType" value={jobType} onChange={handleChange}>
              {jobTypes.map((job) => (
                <option value={job.value} key={job.id}>
                  {job.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="formsButton">
          <button className="btn" type="button" onClick={clearFields}>
            Clear
          </button>
        </div>

        <div className="formsButtons">
          <button className="btn" disabled={isLoading} type="submit">
            {isLoading ? "Please wait.." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddJob;
