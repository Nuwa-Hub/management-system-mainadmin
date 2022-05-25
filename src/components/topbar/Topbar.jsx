import React from "react";
import "./topbar.css";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import userdp from "../../images/user.png"
import { useDispatch, useSelector } from "react-redux";

export default function Topbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);


  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">RedMine(Main Admin)</span>
        </div>
        <div className="topRight">
  
          <img  src={user.img || userdp} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
