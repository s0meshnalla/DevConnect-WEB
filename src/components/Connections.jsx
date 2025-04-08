import axios from "axios";
import { React, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
const Connections = () => {
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      console.log(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="flex justify-center my-10">
      <h1 className="text-blod text-3xl">Connections</h1>
    </div>
  );
};

export default Connections;
