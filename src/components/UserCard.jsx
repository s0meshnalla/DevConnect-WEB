import React from "react";

const UserCard = ({ user }) => {
  console.log(user);
  const { firstName, lastName, age, gender, photoUrl, about, skills } = user;
  return (
    <div>
      <div className="card bg-base-200 p-6 w-96 shadow-sm">
        <figure>
          <img
            src={user.photoUrl}
            alt="profile pic"
            className="w-70 h-70 rounded-full"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName}</h2>
          {lastName && <h2 className="card-title">{lastName}</h2>}

          {(age || gender) && <p>{gender + " " + age}</p>}
          <p>{about}</p>
          <p>{skills}</p>
          <div className="card-actions justify-center mx-4">
            <button className="btn btn-secondary">Interested</button>
            <button className="btn btn-primary">Ignore</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
