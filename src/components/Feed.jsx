import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      // console.log(res.data); // Log to inspect the structure

      // Dispatch the response to Redux
      dispatch(addFeed(res.data.users)); // Assuming res.data.users contains the user array
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, [dispatch]);

  return (
    feed && (
      <div className="flex justify-center my-40">
        {/* Access only the first user (index 0) */}
        <UserCard user={feed[1]} />
      </div>
    )
  );
};

export default Feed;
