import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showStats,
  selectMonthlyApplication,
  selectIsLoading,
} from "../store/allJobSlice";
import Charts from "../components/Charts";
import StatsContainer from "../components/StatsContainer";
import Loader from "../components/UI/Loader";
import "../styles/Stats.css";

const Stats = () => {
  const dispatch = useDispatch();

  const monthlyApplication = useSelector(selectMonthlyApplication);

  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(showStats());
    //eslint-disable-next-line
  }, []);

  return (
    <main className="mainStatsBar">
      {isLoading && <Loader />}
      {!isLoading && <StatsContainer />}
      {!isLoading && monthlyApplication?.length > 0 && <Charts />}
    </main>
  );
};

export default Stats;
