import { Link } from "react-router-dom";
import "./register.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../../components/textField/TextField";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const Register = () => {

  const dispatch=useDispatch()

  const handleClick = (e, { resetForm }) => {
    addUser(dispatch, {...e,isAdmin:true,ismainAdmin:true});
    resetForm();
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
    <div className="registerconstainer">
      <div className="registerwrapper">
        <div className="registertitlewrapper">
          <h1 className="registertitle">SIGN UP</h1>
          <Link to={"/login"}>
            <span className="registerlink">SIGN IN</span>
          </Link>
        </div>
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
              <Form className="registerform">
                <TextField
                  label="Full Name"
                  name="fullname"
                  type="text"
                  className1="newregisterItem"
                />
                <TextField
                  label="Username"
                  name="username"
                  type="text"
                  className1="newregisterItem"
                />
                <TextField
                  label="E-mail"
                  name="email"
                  type="text"
                  className1="newregisterItem"
                />

                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  className1="newregisterItem"
                />
                <TextField
                  label="Phone"
                  type="text"
                  name="telNo"
                  className1="newregisterItem"
                />
                <TextField
                  label="Address"
                  type="text"
                  name="address"
                  className1="newregisterItem"
                />
                <TextField
                  label="Birthhday"
                  type="date"
                  name="birthday"
                  className1="newregisterItem"
                />

                <button className="registerbtn">CREATE</button>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
