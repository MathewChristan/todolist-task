import { Button } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetTasks } from "../redux/slices/taskSlice";

const Setting = () => {
  const { userDetails } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userDetails.userID) navigate("/");
  }, []);

  const logout = (clearAll = false) => {
    console.log(clearAll)
    if (clearAll) {
      localStorage.clear();
      dispatch(resetTasks());
    } else localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="setting-main flex-col">
      <h2 className="text-xl block">Setting Page</h2>
      <div className="mt-5">
        <img
          src={userDetails?.picture?.data?.url}
          alt=""
          className="rounded-full m-auto"
          width={80}
          height={80}
        />

        <div className="text-center">
          <p>{userDetails.name}</p>
          <p className="text-sm">{userDetails.email}</p>
        </div>
        <div className="flex-col">
          <Button block type="primary" onClick={() => logout(false)} className="mt-3">
            Logout
          </Button>
          <Button
            type="primary"
            block
            danger
            onClick={() => logout(true)}
            className="mt-3"
          >
            Clear Task And Logout
          </Button>
          <Button block onClick={() => navigate("/home")} className="mt-3">
            Return
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
