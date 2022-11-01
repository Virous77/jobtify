import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { jobStatus, jobTypes } from "../utils/link";
import { HANDLECHANGE, CLEAR_FILTERS } from "../store/allJobSlice";
import "../styles/Search.css";

const Search = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const { name, value } = e.target;
    dispatch(HANDLECHANGE({ name, value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CLEAR_FILTERS());
  };

  return (
    <section className="searchBar">
      <form>
        <h4>Search Form</h4>

        <div className="searchFields">
          <div className="formInput">
            <input
              type="text"
              name="search"
              placeholder="Search Job"
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="formInput">
            <select
              name="searchStatus"
              value={searchStatus}
              onChange={handleSearch}
            >
              <option value={"all"}>{"all"}</option>
              {jobStatus.map((job) => (
                <option key={job.id} value={job.value}>
                  {job.name}
                </option>
              ))}
            </select>
          </div>

          <div className="formInput">
            <select
              name="searchType"
              value={searchType}
              onChange={handleSearch}
            >
              <option value={"all"}>{"all"}</option>
              {jobTypes.map((job) => (
                <option key={job.id} value={job.value}>
                  {job.name}
                </option>
              ))}
            </select>
          </div>

          <div className="formInput">
            <select name="sort" value={sort} onChange={handleSearch}>
              {sortOptions.map((job, idx) => (
                <option key={idx} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>

          <div className="searchButton">
            <button
              className="btn"
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Search;
