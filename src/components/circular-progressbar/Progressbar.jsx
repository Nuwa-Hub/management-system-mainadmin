import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

const Progressbar = ({progress,_id}) => {
  const percentage = progress*10;

  return (
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
      styles={buildStyles({
        // Rotation of path and trail, in number of turns (0-1)
        rotation: 0.25,
        
        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        strokeLinecap: "butt",

        // Text size
        textSize: "12px",

        // How long animation takes to go from one percentage to another, in seconds
        pathTransitionDuration: 0.5,

        // Can specify path transition in more detail, or remove it entirely
        // pathTransition: 'none',

        // Colors
      
        pathColor: `rgba(${percentage>49 ? 1:255}, ${percentage>49 ? 255:1}, 1, ${(Math.abs(percentage-50) / 50)+0.4})`,
        textColor: "#f88",
        trailColor: "#d6d6d6",
        backgroundColor: "#3e98c7",
      })}
    />
  );
};

export default Progressbar;
