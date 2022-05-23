import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./project.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import GrantChartsm from "../../components/granttChartsm/GrantChartsm";
import Divider from "@mui/material/Divider";
import SearchBar from "material-ui-search-bar";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CreateTaskDialog from "../../components/createTaskDialog/CreateTaskDialog";
import WidgetTask from "../../components/widgetTask/WidgetTask";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../redux/apiCalls";
import { useLocation } from "react-router-dom";

const Project = () => {
  const location = useLocation();
  const projectId = location.pathname.split("/")[2];

  //get project by id
  const project = useSelector((state) =>
    state.project.projects.find((project) => project._id === projectId)
  );

  //get task by projectID
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  useEffect(() => {
    getTasks(dispatch, projectId);
  }, [dispatch, projectId]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  //search bar

  const [searchTasks, setItems] = useState(tasks);
  const [searched, setSearched] = useState("");

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const requestSearch = (searchedVal) => {
    const filteredItems = tasks.filter((task) => {
      return task.Taskname.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setItems(filteredItems);
  };

  useEffect(() => {
    setItems(tasks);
    requestSearch(searched);
  }, [tasks]);
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="uproject">
          <div className="uprojectwrapper">
            <div className="uprojecttop">
              <div className="uprojecttopleft">
                <h3 className="uprojecttoplefttitle">{project.projectname}</h3>
                <h3 className="uprojecttopleftcompany">
                  {project.companyname}
                </h3>
              </div>
              <div className="uprojecttopright">
             
              </div>
            </div>
            <div className="uprojectmid">
              <div className="uprojectdetail">
                <h3 className="uprojectdetailtitle">Project Detail</h3>
                <div className="userShowBottom">
                  <span className="userShowTitle">Account Details</span>
                  <div className="userShowInfo">
                    <PermIdentityIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">annabeck99</span>
                  </div>
                  <div className="userShowInfo">
                    <CalendarTodayIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">10.12.1999</span>
                  </div>
                  <span className="userShowTitle">Contact Details</span>
                  <div className="userShowInfo">
                    <PhoneAndroidIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">+1 123 456 67</span>
                  </div>
                  <div className="userShowInfo">
                    <MailOutlineIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      annabeck99@gmail.com
                    </span>
                  </div>
                  <div className="userShowInfo">
                    <LocationOnIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">New York | USA</span>
                  </div>
                  <span className="projectShowTitle">Contributors</span>
                  <div className="userShowInfo">
                    <img
                      className="contributorImg"
                      src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    />
                  </div>
                </div>
              </div>
              <div className="uprojectanalys">
                <GrantChartsm tasks={tasks} />
              </div>
            </div>
            <Divider className="uprjectpagedevider" />
            <div className="uprojectbottom">
              <div className="uprojectbottomtop">
                <div className="uprojecttopleft">
                  <h3 className="uprojecttaskstitle">Project Tasks</h3>
                </div>
                <div className="uprojecttopright">
                  <SearchBar
                    onCancelSearch={() => cancelSearch()}
                    value={searched}
                    onChange={(searchVal) => {
                      requestSearch(searchVal);
                      setSearched(searchVal);
                    }}
                    onRequestSearch={() => console.log("onRequestSearch")}
                    style={{
                      margin: "5px",
                      width: "400px",
                      height: "40px",
                      maxWidth: 800,
                    }}
                  />
                </div>

                <div className="uprojecttopright"></div>
              </div>
              <div className="uprojectbottombody">
                <Box sx={{ width: "100%", height: "500px" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    {searchTasks.map((task) => (
                      <Grid item xs={4} key={task._id}>
                        <Item sx={{ height: "auto" }}>
                          <WidgetTask task={task} />
                        </Item>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
