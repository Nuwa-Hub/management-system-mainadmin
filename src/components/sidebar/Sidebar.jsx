import "./sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/apiCalls";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import TaskIcon from "@mui/icons-material/Task";
import { confirmAlert } from "react-confirm-alert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "react-confirm-alert/src/react-confirm-alert.css";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";

export default function Sidebar() {
  const dispatch = useDispatch();

  const submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <div>
              <h1 className="logoutmsg">Confirm to Logout?</h1>
              <p className="logout-text">Are you sure to do this.</p>
            </div>
            <div className="logoutaction">
              <button className="logoutbtn no" onClick={onClose}>
                No
              </button>
              <button
                className="logoutbtn yes"
                onClick={() => {
                  logOut(dispatch);
                  onClose();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link className="link" to={"/"}>
              <li className="sidebarListItem">
                <HomeIcon className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link className="link" to={"/timeline"}>
              <li className="sidebarListItem">
                <TimelineIcon className="sidebarIcon" />
                TimeLine
              </li>
            </Link>
            <Link className="link" to={"/projects"}>
              <li className="sidebarListItem">
                <LaptopChromebookIcon className="sidebarIcon" />
                Projects
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link className="link" to={"/users"}>
              <li className="sidebarListItem ">
                <PersonOutlineIcon className="sidebarIcon" />
                Developers
              </li>
            </Link>
            <Link className="link" to={"/managers"}>
              <li className="sidebarListItem">
                <SupervisorAccountIcon className="sidebarIcon" />
                Project Managers
              </li>
            </Link>

            <Link className="link" to={"/newuser"}>
              <li className="sidebarListItem">
                <PersonAddAltIcon className="sidebarIcon" />
                New User
              </li>
            </Link>
            {/* <Link className="link" to={"/sendemail"}>
              <li className="sidebarListItem">
                <EmailIcon className="sidebarIcon" />
                Send Email
              </li>
            </Link> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            {/* <Link className="link" to={`/profile/ ${234}`}>
              <li className="sidebarListItem">
                <AccountCircleIcon className="sidebarIcon" />
                Profile
              </li>
            </Link> */}
            <Link className="link" to={`/editprofile`}>
              <li className="sidebarListItem">
                <ManageAccountsIcon className="sidebarIcon" />
                Manage Profile
              </li>
            </Link>
            <Link className="link" to={"/changepassword"}>
            <li className="sidebarListItem">
              <PasswordIcon className="sidebarIcon" />
              Change Pasword
            </li>
            </Link>
            <li className="sidebarListItem" onClick={submit}>
              <LogoutIcon className="logoutIcon" />
              <span className="logouttext">logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
