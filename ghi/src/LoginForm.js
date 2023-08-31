import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);

    e.target.reset();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h3 className="text-2xl font-semibold text-center mb-4">Login</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username:
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              id="rememberMe"
            />
            <span className="text-sm">Remember Me</span>
          </label>
        </div>
        <div>
          <button
            className="bg-black hover:bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800 w-full"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>

    </div>
  );
};

export default LoginForm;
