import "./newUser.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import userdp from "../../images/user.png";
import PublishIcon from "@mui/icons-material/Publish";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db, auth, storage } from "../../firebase";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../../components/textField/TextField";

export default function NewUser() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  console.log(inputs);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e, { resetForm }) => {
    

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
            const user = { ...e, img: downloadURL, ...inputs };
            //console.log(user)
            addUser(dispatch, user);
            resetForm();
          });
        }
      );
    } else {
      const user = { ...e, ...inputs };
      console.log(user);
       addUser(dispatch, user);
      resetForm();
    }
  };

  //validate
  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const validate = Yup.object({
    username: Yup.string()
    .max(20, "Must be 20 characters or less!")
    .required("Required"),
    fullname: Yup.string()
      .max(20, "Must be 20 characters or less!")
      .required("Required"),
    email: Yup.string()
      .email("Field should contain a valid e-mail")
      .max(20, "Must be 20 characters or less!")
      .required("Required"),
    telNo: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
    address: Yup.string()
      .max(25, "Must be 25 characters or less!")
      .required("Required"),
    birthday: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    
  });
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="newUser">
          <Formik
            initialValues={{
              username: "",
              email: "",
              telNo: "",
              address: "",
              fullname: "",
              birthday: "",
              password: "",
            }}
            validationSchema={validate}
            onSubmit={handleClick}
          >
            {({ values, isValid, dirty }) => (
              <>
                <h1 className="newUserTitle">New User</h1>
                <Form className="newUserForm">
                  <div className="userforminput">
                    <div className="userformleft">
                      <TextField
                        label="Full Name"
                        name="fullname"
                        type="text"
                        className1="newUserItem"
                      />
                      <TextField
                        label="Username"
                        name="username"
                        type="text"
                        className1="newUserItem"
                      />
                      <TextField
                        label="E-mail"
                        name="email"
                        type="text"
                        className1="newUserItem"
                      />

                      <TextField
                        label="Password"
                        type="password"
                        name="password"
                        className1="newUserItem"
                      />
                      <TextField
                        label="Phone"
                        type="text"
                        name="telNo"
                        className1="newUserItem"
                      />
                      <TextField
                        label="Address"
                        type="text"
                        name="address"
                        className1="newUserItem"
                      />
                      <TextField
                        label="Birthhday"
                        type="date"
                        name="birthday"
                        className1="newUserItem"
                      />

                      <div className="newUserItem">
                        <label>Is Admin</label>
                        <select
                          className="newUserSelect"
                          onChange={handleChange}
                          name="isAdmin"
                          id="active"
                        >
                          <option name="isAdmin" value={true}>
                            Yes
                          </option>
                          <option name="isAdmin" value={false}>
                            No
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="userformRight">
                      <div className="productUpload">
                        <img src={userdp} alt="" className="productUploadImg" />
                        <label htmlFor="file">
                          <PublishIcon />
                        </label>
                        <input
                          type="file"
                          id="file"
                          onChange={(e) => setFile(e.target.files[0])}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                  </div>
                  <button className="newUserButton" type="submit">
                    Create
                  </button>
                </Form>
              </>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
