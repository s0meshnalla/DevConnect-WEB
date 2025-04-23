import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.users));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, [dispatch]);

  const handleNextUser = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const currentUser = feed?.[currentIndex];

  return (
    <div className="flex justify-center my-40">
      {currentUser ? (
        <UserCard user={currentUser} onNext={handleNextUser} />
      ) : (
        <div className="text-xl text-center font-semibold">
          No more users in feed 🎉
        </div>
      )}
    </div>
  );
};

export default Feed;
