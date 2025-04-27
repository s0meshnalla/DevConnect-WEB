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
  const [connections, setConnections] = useState([]);

  const [searchEmail, setSearchEmail] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Add function to fetch connections
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      setConnections(res.data.data || []);
    } catch (error) {
      console.log("Error fetching connections:", error);
    }
  };

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

  const searchUser = async (e) => {
    e.preventDefault();
    setSearchError("");
    setSearchedUser(null);
    setIsSearching(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/user/search`,
        { email: searchEmail },
        { withCredentials: true }
      );

      const users = res.data.user;

      if (Array.isArray(users) && users.length > 0) {
        const user = users[0];
        // Check if user is in connections
        const isConnected = connections.some((conn) => conn._id === user._id);
        setSearchedUser({ ...user, isConnected });
      } else {
        setSearchError("User not found");
      }
    } catch (error) {
      setSearchError(error.response?.data?.error || "Failed to search user");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    getFeed();
    fetchConnections();
  }, [dispatch]);

  const handleNextUser = () => {
    if (searchedUser) {
      setSearchedUser(null);
      setSearchEmail("");
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const currentUser = feed?.[currentIndex];

  return (
    <div className="flex flex-col items-center my-40">
      {/* Search */}
      <div className="w-96 mb-8">
        <form onSubmit={searchUser} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Search user by email"
            className="input input-bordered"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSearching || !searchEmail}
          >
            {isSearching ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Search"
            )}
          </button>
        </form>
        {searchError && (
          <div className="text-error mt-2 text-center">{searchError}</div>
        )}
      </div>

      {/* UserCard */}
      {searchedUser ? (
        <UserCard user={searchedUser} onNext={handleNextUser} />
      ) : currentUser ? (
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
