import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user, onNext }) => {
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
  } = user;

  const sendRequest = async (status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      alert(res.data.message);
      onNext(); // ✅ Move to next user after request
    } catch (error) {
      const message = error?.response?.data?.error || "Something went wrong";
      alert(message);
    }
  };

  return (
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
        <p>{skills?.join(", ")}</p>

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <div className="mt-2">
            <h3 className="font-bold">Social Links:</h3>
            <ul className="list-disc ml-6">
              {Object.entries(socialLinks).map(([platform, link]) => (
                <li key={platform}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="card-actions justify-center mx-4 mt-4">
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
  );
};

export default UserCard;
