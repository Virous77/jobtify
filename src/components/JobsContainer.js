import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectJobs, selectIsLoading, getAllJobs } from "../store/allJobSlice";
import Job from "./Job";
import Loader from "./UI/Loader";
import "../styles/Job.css";
import Pagination from "./Pagination";

const JobsContainer = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobs);
  const isLoading = useSelector(selectIsLoading);
  const {
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allJobs);

  useEffect(() => {
    dispatch(getAllJobs());
  }, [page, search, searchStatus, searchType, sort]);

  if (isLoading) return <Loader />;

  return (
    <section className="jobsContainerBar">
      <h5>Jobs Info</h5>

      <p className="jobsCount">
        {totalJobs} Job{totalJobs > 1 && "s"} Found
      </p>
      <div className="jobList">
        {jobs?.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      {numOfPages > 1 && <Pagination />}
    </section>
  );
};

export default JobsContainer;
