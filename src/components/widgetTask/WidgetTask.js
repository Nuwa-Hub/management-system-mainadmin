import React from "react";
import "./widgetTask.css";
import BookIcon from "@mui/icons-material/Book";
import Button from "@mui/material/Button";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import userdp from "../../images/user.png";
import { useSelector } from "react-redux";

const WidgetTask = ({task}) => {
//get developer id
const developer = useSelector((state) =>
    state.developer.developers.find((developer) => developer._id === task.developerId)
  );

  return (
    <div className="widgetTask">
      <div className="widgetTaskwrapper">
        <div className="widgetTasktop">
          <h3 className="widgetTasktitle">{task.Taskname}</h3>
       
        </div>
        <div className="widgetTaskbottom">
          <div className="widgetTaskleft">
            <span className="projectShowTitle">Project Detail</span>
            <div className="projectShowInfo">
              <BookIcon className="projectShowIcon" />
              <span className="userShowInfoTitle">test</span>
            </div>
            <div className="projectShowInfo">
              <BookIcon className="projectShowIcon" />
              <span className="userShowInfoTitle">test</span>
            </div>
            <div className="projectShowInfo">
              <BookIcon className="projectShowIcon" />
              <span className="userShowInfoTitle">test</span>
            </div>
          </div>
          <div className="widgetTaskright">
            <span className="projectShowTitle">Contributor</span>
            <div className="userShowInfo">
              <img
                className="taskcontributorImg"
                src={userdp || developer.img} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetTask;
