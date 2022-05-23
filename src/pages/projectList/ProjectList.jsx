import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import "./projectList.css";
import Progressbar from "../../components/circular-progressbar/Progressbar";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BookIcon from "@mui/icons-material/Book";
import PendingIcon from "@mui/icons-material/Pending";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Button from "@mui/material/Button";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../redux/apiCalls";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "material-ui-search-bar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

const ProjectList = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);
  
  useEffect(() => {
    getProjects(dispatch);
  }, [dispatch]);

  //search bar

const [searchProjects, setItems] = React.useState(projects);
const [searched, setSearched] = React.useState("");

const cancelSearch = () => {
  setSearched("");
  requestSearch("");
};

const requestSearch = (searchedVal) => {
  const filteredItems = projects.filter((project) => {
    return project.projectname.toLowerCase().includes(searchedVal.toLowerCase());
  });
  setItems(filteredItems);
};

useEffect(() => {
  setItems(projects);
  requestSearch(searched);
}, [projects]);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="project">
          <div className="projectpagetop">
            <h3 className="projectpagetitle">Projects</h3>
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
                      width:"400px",
                      height:"40px",
                      maxWidth: 1200,
                      maxHight:100,
                    }}
                  />
          <div></div>
          </div>
          <Box className="box" sx={{ width: "100%", height: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {searchProjects.map((project) => (
                <Grid item xs={4} key={project._id}>
                  <Item>
                    <div className="projectShow">
                      <div className="projectShowTop">
                        <div className="projectShowTopTitle">
                          <span className="projectShowprojectname">
                            {project.projectname}
                          </span>
                          <span className="projectShowprojectTitle">
                            {project.companyname}
                          </span>
                        </div>
                        <Link  className="link" to={"/project/"+project._id}>
                        <Button
                          className="viewbutton"
                          variant="outlined"
                        >
                          <RemoveRedEyeIcon className="viewbuttonicon" />
                          <h1 className="viewbuttontext">display</h1>
                        </Button>
                        </Link>
                      </div>
                      <div className="projectShowBottom">
                        <div className="projectShowdetail">
                          <span className="projectShowTitle">
                            Project Detail
                          </span>
                          <div className="projectShowInfo">
                            <Grid3x3Icon className="projectShowIcon" />
                            <span className="userShowInfoTitle">
                              {project._id}
                            </span>
                          </div>
                          <div className="projectShowInfo">
                            <BookIcon className="projectShowIcon" />
                            <span className="userShowInfoTitle">tast</span>
                          </div>
                          <div className="projectShowInfo">
                            {project.status === "pending" ? (
                              <PendingIcon className="projectShowIcon pending" 
                               />
                            ) : (
                              <DoneOutlineIcon className="projectShowIcon done" />
                            )}
                            <span className="userShowInfoTitle">
                              {project.status}
                            </span>
                          </div>
                          <span className="projectShowTitle">Contributors</span>
                          <div className="userShowInfo">
                            <img
                              className="contributorImg"
                              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            />
                          </div>
                        </div>
                        <div className="projectShowcontributors">
                          <span className="projectShowTitle">
                            Project Analytics
                          </span>
                          <div className="projectShowInfo">
                            <Progressbar progress={project.progress} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
};

export default ProjectList;
