import axios from "axios";
import { React, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return;
  }

  if (connections.length === 0) {
    return (
      <>
        <h1>No Connections Found</h1>
      </>
    );
  }

  return (
    <div className=" text-center my-10">
      <h1 className="text-blod text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { firstName, lastName, gender, photoUrl, about, age } =
          connection;
        return (
          <div className="flex m-4 p-4 rounded-xl bg-base-200 w-1/2 mx-auto">
            <div className="m-4">
              <img
                alt="photo"
                src={photoUrl}
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="p-3">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && <p>{age}</p>}
              {gender && <p>{gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
