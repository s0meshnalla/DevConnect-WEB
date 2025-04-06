import React, { use, useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";

const EditProfile = (user) => {
  const [firstName, setFirstname] = useState(user.user.firstName);
  const [lastName, setLastName] = useState(user.user.lastName);
  const [age, setAge] = useState(user.user.age);
  const [photoUrl, setPhotoUrl] = useState(user.user.photoUrl);
  const [about, setAbout] = useState(user.user.about);
  const [skills, setSkills] = useState(user.user.skills);

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          photoUrl,
          about,
          skills,
        },
        { withCredentials: true }
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center my-40 space-x-8">
      <div className="flex justify-center ">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title ">Edit Profile</h2>
            <div>
              {/*FirstName Edit Field*/}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">FirstName</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                />
              </fieldset>
              {/*LastName Edit Field*/}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">LastName</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </fieldset>
              {/*PhotoUrl Edit Field*/}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">PhotoUrl</legend>
                <input
                  type="text"
                  className="input"
                  value={photoUrl}
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                  }}
                />
              </fieldset>
              {/*Age Edit Field*/}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  className="input"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </fieldset>
              {/*About Edit Field*/}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  className="input"
                  value={about}
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                />
              </fieldset>
              {/*Skills Edit Field*/}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Skills</legend>
                <input
                  type="text"
                  className="input"
                  value={skills}
                  onChange={(e) => {
                    setSkills(e.target.value);
                  }}
                />
              </fieldset>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Save Profile</button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, age, photoUrl, about, skills }} />
    </div>
  );
};

export default EditProfile;
