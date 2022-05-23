import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./changePassword.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../../components/textField/TextField";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/apiCalls";

const ChangePassword = () => {
  //get user
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.currentUser);

  const handleClick = (e, { resetForm }) => {
      const data={
          userId:userId._id,
          currentPassword:e.currentPassword,
          newPassword:e.newPassword,
      }
      console.log(data)
    changePassword(dispatch,data)
    resetForm();
  };

  //validate
  const validate = Yup.object({
    currentPassword: Yup.string()
      .max(25, "Must be 25 characters or less!")
      .required("Requered!"),
    newPassword: Yup.string()
       .matches(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",
        "Must Contain One Uppercase"
      )
      .required("Requered!"),
    confirmPassword: Yup.string()
      .required("Requered!")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="changepassword">
          <div className="changepasswordwrapper">
            <Formik
              initialValues={{
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={validate}
              onSubmit={handleClick}
            >
              {({ values, isValid, dirty }) => (
                 
                <>
                  <h1 className="newProjectTitle">Change Password</h1>
                  <Form className="newProjectForm">
                    <TextField
                      label="Current Password"
                      name="currentPassword"
                      type="password"
                      className1="newProjectItem"
                    />
                    <TextField
                      label="New Password"
                      name="newPassword"
                      type="password"
                      className1="newProjectItem"
                    />
                    <TextField
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      className1="newProjectItem"
                    />

                    <button
                      variant="contained"
                      type="submit"
                      className="newProjectButton"
                    >
                      Create
                    </button>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
