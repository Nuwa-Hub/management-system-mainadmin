import React, { useState } from "react";
import { Chart } from "react-google-charts";

export function GrantChartsm({ tasks }) {
  //add delay
  const [isShown, setIsShown] = useState(false);
  setTimeout(() => {
    setIsShown(true);
  }, 1000);
  
  //if task not added
  if(tasks.length<1) return <h6>Task not added yet!!!!</h6> 

  const row = tasks.map(createdata);
  
  function createdata(task) {
      return [
        task._id,
        task.Taskname,
        task.Taskname,
        new Date(Number(task.updatedAt.split("-")[0]),
        Number(task.updatedAt.split("-")[1]),
        Number(task.updatedAt.split("-")[2].slice(0,2))),
        new Date(
          Number(task.duedate.split("-")[0]),
          Number(task.duedate.split("-")[1]),
          Number(task.duedate.split("-")[2].slice(0,2))
        ),
       
        null,
        100,
        null,
      ];
    
   
  }

  const options = {
    height: row.length * 30 + 50,
    gantt: {
      trackHeight: 30,
      palette: [
        {
          "color": "#5e97f6",
          "dark": "#2a56c6",
          "light": "#c6dafc"
        },
        {
          "color": "#db4437",
          "dark": "#a52714",
          "light": "#f4c7c3"
        },
        {
          "color": "#f2a600",
          "dark": "#ee8100",
          "light": "#fce8b2"
        },
        {
          "color": "#0f9d58",
          "dark": "#0b8043",
          "light": "#b7e1cd"
        },
        {
          "color": "#ab47bc",
          "dark": "#6a1b9a",
          "light": "#e1bee7"
        },
        {
          "color": "#00acc1",
          "dark": "#00838f",
          "light": "#b2ebf2"
        },
        {
          "color": "#ff7043",
          "dark": "#e64a19",
          "light": "#ffccbc"
        },
        {
          "color": "#9e9d24",
          "dark": "#827717",
          "light": "#f0f4c3"
        },
        {
          "color": "#5c6bc0",
          "dark": "#3949ab",
          "light": "#c5cae9"
        },
        {
          "color": "#f06292",
          "dark": "#e91e63",
          "light": "#f8bbd0"
        },
        {
          "color": "#00796b",
          "dark": "#004d40",
          "light": "#b2dfdb"
        },
        {
          "color": "#c2185b",
          "dark": "#880e4f",
          "light": "#f48fb1"
        }
      ],
    },
    
  };
  const column = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];
  const data1 = [column, ...row];

   return isShown ? (
    <Chart
      chartType="Gantt"
      width="100%"
      height="100%"
      data={data1}
      options={options}
    />
  ): <h4>Loading.....</h4>;
}

export default GrantChartsm;
