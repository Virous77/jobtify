import React from "react";
import {
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
} from "recharts";

const BarCharts = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" stroke=" rgb(4, 10, 10)" fill=" rgb(218, 2, 2)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarCharts;
