import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";

const LoginForm = ({ onUserChange }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, fetchWithToken } = useToken();

  const [userId, setUserId] = useState(null);
  const API_HOST = process.env.REACT_APP_API_HOST;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);

    const userDetails = await fetchWithToken(`${API_HOST}/api/users/${username}`);
    if (userDetails) {
      setUserId(userDetails.id);
      onUserChange(userDetails); // Update userDetails in App.js
    }

    e.target.reset();
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Login</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              className="bg-black hover:bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
