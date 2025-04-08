import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addRequests(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);
  if (!requests) {
    return;
  }

  if (requests.length === 0) {
    return (
      <>
        <h1>No Connections Found</h1>
      </>
    );
  }

  return (
    <div className=" text-center my-10">
      <h1 className="text-blod text-3xl">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, gender, photoUrl, about, age } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-xl bg-base-200 w-1/2 mx-auto"
          >
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
            <div>
              <button className="btn btn-primary">Accept</button>
              <button className="btn btn-secondary">Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
