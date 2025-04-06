import React from "react";

const UserCard = ({ user }) => {
  const { firstName, age, gender, photoUrl, about, skills } = user;

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={user.photoUrl}
            alt="profile pic"
            className="w-70 h-80 rounded-full"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName}</h2>
          <p>{gender}</p>
          <p>{age}</p>
          <p>{about}</p>
          <div className="card-actions justify-end">
            <p>{skills}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
