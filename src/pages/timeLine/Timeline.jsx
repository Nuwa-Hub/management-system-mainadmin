import React, { useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import WorkIcon from "@mui/icons-material/Work";
import "./timeline.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../redux/apiCalls";

const Timeline = () => {
  const dispatch = useDispatch();
  var count = 0;
  const projects = useSelector((state) => state.project.projects);

  useEffect(() => {
    getProjects(dispatch);
  }, [dispatch]);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="timeline">
          <VerticalTimeline>
            {projects.map((project) => (
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2011 - present"
                iconStyle={
                  count++ % 2
                    ? { background: "rgb(33, 150, 243)", color: "#fff" }
                    : { background: "rgb(233, 30, 99)", color: "#fff" }
                }
                icon={<WorkIcon />}
              >
                <h3 className="vertical-timeline-element-title">
                  {project.projectname}
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {project.companyname}
                </h4>
                <p>
                  Creative Direction, User Experience, Visual Design, Project
                  Management, Team Leading
                </p>
              </VerticalTimelineElement>
            ))}

            
          </VerticalTimeline>
        </div>
      </div>
    </>
  );
};

export default Timeline;
