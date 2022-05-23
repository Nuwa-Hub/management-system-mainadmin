import React from "react";
import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    uv: 4000,
    activeUser: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    activeUser: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    activeUser: 9800,
    amt: 2290,
  },
  {
    name: "April",
    uv: 2780,
    activeUser: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    activeUser: 4800,
    amt: 2181,
  },
  {
    name: "June",
    uv: 2390,
    activeUser: 3800,
    amt: 2500,
  },
  {
    name: "July",
    uv: 3490,
    activeUser: 4300,
    amt: 2100,
  },
];
const Chart = ({ title, data, dataKey, grid }) => {
  
  return (
    <div className="chart">
      <h3 className="chartTitle">Project Analytics</h3>
      <ResponsiveContainer width="100%" aspect={5 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Tooltip />
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
          <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
