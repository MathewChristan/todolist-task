import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const { userDetails } = useSelector((state) => state.user);

  return (
    <div className="header-main py-3 bg-slate-200 shadow flex justify-between items-center px-10">
      <h1 className="text-slate-700 text-2xl mb-0">Todo List</h1>
      <div className="flex items-center">
        {userDetails?.picture && (
          <img
            className="w-14 h-14 rounded-full object-cover"
            src={userDetails?.picture?.data?.url}
          />
        )} 

        <div>
          <p className="capitalize text-slate-700 pl-4 mb-0">
            {userDetails.name}
          </p>
          <p className="text-slate-700 pl-4 text-sm lowercase">
            {userDetails.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
