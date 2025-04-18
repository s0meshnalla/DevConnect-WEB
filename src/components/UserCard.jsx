import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, photoUrl, about, skills } =
    user;

  const sendRequest = async (status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      console.log(res.data.message); // e.g., John is interested in Jane
      alert(res.data.message);
    } catch (error) {
      const message = error?.response?.data?.error || "Something went wrong";
      console.error("Send Request Error:", message);
      alert(message);
    }
  };

  return (
    <div>
      <div className="card bg-base-200 p-6 w-96 shadow-sm">
        <figure>
          <img
            src={photoUrl}
            alt="profile pic"
            className="w-70 h-70 rounded-full"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          {(age || gender) && <p>{gender + " " + age}</p>}
          <p>{about}</p>
          <p>{skills}</p>
          <div className="card-actions justify-center mx-4">
            <button
              className="btn btn-secondary"
              onClick={() => sendRequest("interested")}
            >
              Interested
            </button>
            <button
              className="btn btn-primary"
              onClick={() => sendRequest("ignoring")}
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
