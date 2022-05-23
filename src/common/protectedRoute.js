import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginFailure } from "../redux/userRedux";

function ProtectedRoute({ element, path }) {
  const user = useSelector((state) => state?.user?.currentUser);
  const dispatch=useDispatch();

  if (user == null || user == false) {
    return <Navigate to="/login" />;
  }
  //console.log(user)

  if(user.isAdmin && user.ismainAdmin){
    return  element;
  }
  else{
    
    dispatch(loginFailure())
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
