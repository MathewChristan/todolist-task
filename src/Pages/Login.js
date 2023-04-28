import React from "react";
import FacebookLogin from "react-facebook-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginHandler } from "../redux/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responseFacebook = (response) => {
    dispatch(loginHandler(response));
    navigate("/home");
  };

  const componentClicked = (res) => {};

  return (
    <div className="login-bg">
      <div className="login-box items-center flex justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-5">Todo List APP</h2>
          <FacebookLogin
            appId="1296722707818663"
            // autoLoad={true}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
