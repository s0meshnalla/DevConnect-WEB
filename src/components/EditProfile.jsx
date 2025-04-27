import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstname] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [socialLinks, setSocialLinks] = useState(user?.socialLinks || {});
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");

    if (!firstName.trim()) {
      setError("First name is required.");
      return;
    }

    const hasAtLeastOneLink = Object.values(socialLinks).some(
      (link) => link.trim() !== ""
    );
    if (!hasAtLeastOneLink) {
      setError(
        "Please provide at least one social link (GitHub, LinkedIn, or Twitter)."
      );
      return;
    }

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          photoUrl,
          about,
          skills,
          socialLinks,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex justify-center my-40 gap-12 items-start">
        {/* Form */}
        <div className="flex flex-col items-center space-y-8 w-[400px]">
          <div className="card card-border bg-base-300 w-full">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name *</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo URL</legend>
                <input
                  type="text"
                  className="input"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="number"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  className="input"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Skills (comma-separated)
                </legend>
                <input
                  type="text"
                  className="input"
                  value={Array.isArray(skills) ? skills.join(", ") : skills}
                  onChange={(e) =>
                    setSkills(e.target.value.split(",").map((s) => s.trim()))
                  }
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">GitHub</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="https://github.com/username"
                  value={socialLinks.GitHub || ""}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, GitHub: e.target.value })
                  }
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">LinkedIn</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="https://linkedin.com/in/username"
                  value={socialLinks.LinkedIn || ""}
                  onChange={(e) =>
                    setSocialLinks({
                      ...socialLinks,
                      LinkedIn: e.target.value,
                    })
                  }
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Twitter</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="https://twitter.com/handle"
                  value={socialLinks.Twitter || ""}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, Twitter: e.target.value })
                  }
                />
              </fieldset>

              {error && <p className="text-red-500 mt-2">{error}</p>}

              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* UserCard preview */}
        <div className="w-[400px]">
          <UserCard
            user={{
              firstName,
              lastName,
              age,
              photoUrl,
              about,
              skills,
              socialLinks,
            }}
          />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved Successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
