import React from "react";
import EditProfile from "./editProfile";
import { useSelector } from "react-redux";

const Porfile = () => {
  const user = useSelector((store) => store.user);
  console.log(user);
  return (
    user && (
      <div>
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Porfile;
