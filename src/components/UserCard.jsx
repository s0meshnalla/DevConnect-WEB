import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const DEFAULT_PHOTO = "https://cdn-icons-png.flaticon.com/512/6681/6681204.png";

const UserCard = ({ user, onNext }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    _id,
    firstName,
    lastName,
    age,
    gender,
    photoUrl,
    about,
    skills,
    socialLinks,
    isConnected,
  } = user;

  const sendRequest = async (status) => {
    try {
      setErrorMessage(""); // Clear previous errors
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      alert(res.data.message);
      if (onNext) onNext();
    } catch (error) {
      // ✅ Handle both string and object-based errors
      const message =
        typeof error?.response?.data === "string"
          ? error.response.data
          : error?.response?.data?.error || "Something went wrong";
      setErrorMessage(message);
    }
  };

  return (
    <div className="card bg-base-200 p-6 w-96 shadow-sm">
      <figure>
        <img
          src={photoUrl || DEFAULT_PHOTO}
          alt="profile pic"
          className="w-40 h-40 rounded-full object-cover"
          onError={(e) => (e.currentTarget.src = DEFAULT_PHOTO)}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-center">
          {firstName} {lastName}
        </h2>
        <p className="text-sm text-gray-600 text-center">
          {age} • {gender}
        </p>
        <p className="mt-2 text-center">{about}</p>

        {skills?.length > 0 && (
          <div className="mt-2 text-center">
            <strong>Skills:</strong>
            <div className="flex flex-wrap justify-center gap-2 mt-1">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="badge badge-secondary text-xs px-2 py-1"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <div className="mt-3 text-center">
            <strong>Social Links:</strong>
            <ul className="list-disc list-inside text-blue-500">
              {Object.entries(socialLinks).map(([platform, url]) => (
                <li key={platform}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="card-actions justify-center gap-4 mt-4">
          {isConnected ? (
            <div className="text-success font-semibold">Already Connected</div>
          ) : (
            <>
              <button
                className="btn btn-success"
                onClick={() => sendRequest("interested")}
              >
                Interested
              </button>
              <button
                className="btn btn-outline btn-error"
                onClick={() => sendRequest("ignoring")}
              >
                Ignore
              </button>
            </>
          )}
        </div>

        {errorMessage && (
          <p className="text-error text-sm text-center mt-3">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default UserCard;
