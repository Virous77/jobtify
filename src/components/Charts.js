import React, { useState } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import { useSelector } from "react-redux";
import { selectMonthlyApplication } from "../store/allJobSlice";
import "../styles/Chart.css";

const Charts = () => {
  const [barChart, setBarChart] = useState(true);

  const monthlyApplicaion = useSelector(selectMonthlyApplication);

  return (
    <section className="chartBar">
      <h4>Monthly Applications</h4>

      <button onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>

      <div className="mainChart">
        {barChart ? (
          <BarChart data={monthlyApplicaion} />
        ) : (
          <AreaChart data={monthlyApplicaion} />
        )}
      </div>
    </section>
  );
};

export default Charts;
