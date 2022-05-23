import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import "./editProfile.css";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublishIcon from "@mui/icons-material/Publish";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import userdp from "../../images/user.png";
import { updateCurrentUser, updateUser } from "../../redux/apiCalls";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../../components/textField/TextField";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db, auth, storage } from "../../firebase";

export default function EditProfile() {
 


  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  //get current user
  const developer = useSelector((state) => state?.user?.currentUser);

  const handleClick = (e, { resetForm }) => {
    const updatedeveloper = { ...e };
    Object.keys(updatedeveloper).forEach(key => {
      if (updatedeveloper[key] === '') {
        delete updatedeveloper[key];
      }
    });
    
    if (file) {
      const fileName = `dp/${new Date().getTime()} - ${file.name}`;
      //const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const updatedeveloperu = { ...updatedeveloper, img: downloadURL };
            //console.log(user)
            updateCurrentUser(dispatch,updatedeveloperu,developer._id);
            resetForm();
          });
        }
      );
    } else {
      updateCurrentUser(dispatch,updatedeveloper,developer._id);  
    }
    updateCurrentUser(dispatch,updatedeveloper,developer._id);
    resetForm();
  
  };

  //validate
  const phoneRegExp =/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

  const validate = Yup.object({
    fullname: Yup.string().max(12, "Must be 12 characters or less!"),
    email: Yup. string(). email("Field should contain a valid e-mail"). max(20, "Must be 20 characters or less!"),
    telNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    address: Yup.string().max(25, "Must be 25 characters or less!"),
  });
  //console.log(developer)
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />

        <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle">Edit Profile</h1>
            
          </div>

          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <img
                  src={ developer.img || userdp}
                  alt="user img"
                  className="userShowImg"
                />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">{developer.fullname}</span>
                  <span className="userShowUserTitle">Software Engineer</span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                  <PermIdentityIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">
                  {developer.fullname}
                  </span>
                </div>
                <div className="userShowInfo">
                  <CalendarTodayIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">{developer.birthday.slice(0,10)}</span>
                </div>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                  <PhoneAndroidIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">{developer.telNo}</span>
                </div>
                <div className="userShowInfo">
                  <MailOutlineIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">{developer.email}</span>
                </div>
                <div className="userShowInfo">
                  <LocationOnIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">{developer.address}</span>
                </div>
              </div>
            </div>
            <div className="userUpdate">
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  telNo: "",
                  address: "",
                }}
                validationSchema={validate}
                onSubmit={handleClick}
              >
                {({ values, isValid, dirty }) => (
                  <>
                    <span className="userUpdateTitle">Edit</span>
                    <Form className="userUpdateForm">
                      <div className="userUpdateLeft">
                        <TextField
                          label="Full Name"
                          name="fullname"
                          type="text"
                          className1="userUpdateItem"
                          className2="userUpdateInput"
                        />
                        <TextField
                          label="Email"
                          name="email"
                          type="text"
                          className1="userUpdateItem"
                          className2="userUpdateInput"
                        />
                        <TextField
                          label="Phone"
                          name="telNo"
                          type="text"
                          className1="userUpdateItem"
                          className2="userUpdateInput"
                        />
                        <TextField
                          label="Address"
                          name="address"
                          type="text"
                          className1="userUpdateItem"
                          className2="userUpdateInput"
                        />
                      </div>
                      <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                          <img
                            className="userUpdateImg"
                            src={ developer.img || userdp }
                            alt="user img"
                          />
                          <label htmlFor="file">
                            <PublishIcon className="userUpdateIcon" />
                          </label>
                          <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                        </div>
                        <button className="userUpdateButton" type="submit" >
                          Update
                        </button>
                      </div>
                    </Form>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
