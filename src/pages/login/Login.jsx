import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/apiCalls";
import "./login.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../../components/textField/TextField";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  //let navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  const handleClick = (e, { resetForm }) => {
    login(dispatch, e);
    resetForm();
  };

  //if (user != null) navigate("/");
  //validate
  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const validate = Yup.object({
    username: Yup.string()
      .max(20, "Must be 20 characters or less!")
      .required("Required"),
    password: Yup.string().required("Required"),
  });
  return (
    <div className="logincontainer">
      <div className="loginwrapper">
        <div className="logintitlewrapper">
          <h1 className="logintitle">SIGN IN</h1>
          <Link to={"/register"}>
            <span className="loginlink">SIGN UP</span>
          </Link>
        </div>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={validate}
          onSubmit={handleClick}
        >
          {({ values, isValid, dirty }) => (
            <>
              <Form
                style={{
            
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  style={{
                    width: 340,
                    padding: 10,
                    marginBottom: 5,
                    marginTop: 10,
                    
                  }}
                  type="text"
                  placeholder="username"
                  label="Username"
                  name="username"
                />
                <TextField
                  style={{
                    width: 340,
                    padding: 10,
                    marginBottom: 5,
                    marginTop: 10,
                  }}
                  type="password"
                  placeholder="username"
                  label="Password"
                  name="password"
                />

                <button type="submit" className="loginbutton">
                  Login
                </button>
                {error && (
                  <span className="loginerr">
                    Wrong username or password !!!
                  </span>
                )}
              </Form>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
