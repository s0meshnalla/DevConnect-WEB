import axios from "axios";
import { React, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="text-center my-10">
        <h1 className="text-2xl">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl mb-6">Connections</h1>

      {connections.map((connection) => {
        const {
          _id,
          firstName,
          lastName,
          gender,
          photoUrl,
          about,
          age,
          socialLinks,
        } = connection;

        return (
          <div
            key={_id}
            className="flex flex-col md:flex-row m-4 p-4 rounded-xl bg-base-200 w-full md:w-1/2 mx-auto"
          >
            <div className="m-4 flex justify-center">
              <img
                alt="photo"
                src={photoUrl}
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="p-3 flex-grow text-left">
              <h2 className="font-bold text-xl">
                {firstName} {lastName}
              </h2>
              {age && <p>Age: {age}</p>}
              {gender && <p>Gender: {gender}</p>}
              <p>{about}</p>

              {/* ✅ Render Social Links */}
              {socialLinks && Object.keys(socialLinks).length > 0 && (
                <div className="mt-2">
                  <h3 className="font-bold">Social Links:</h3>
                  <ul className="list-disc ml-5">
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
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
