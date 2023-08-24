import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { register } = useToken();
  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();
    const accountData = {
      username: username,
      password: password,
      email: email,
      first_name: firstName,
      last_name: lastName,
    };
    register(accountData,`${process.env.REACT_APP_API_HOST}/api/users`);
    e.target.reset();
    navigate("/");
  };

    return (
    <div className="card text-bg-light mb-3">
        {/* <h5 className="card-header">Signup</h5> */}
        <div className="card-body">
            <form onSubmit={(e) => handleRegistration(e)}>
                <div className="mb-3">
                    <label className="form-label">first name</label>
                        <input
                            name="firstName"
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                            setFirstName(e.target.value);
                            }}
                        />
                </div>
                <div className="mb-3">
                    <label className="form-label">last name</label>
                        <input
                            name="lastName"
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                            setLastName(e.target.value);
                            }}
                        />
                </div>
                <div className="mb-3">
                    <label className="form-label">username</label>
                        <input
                            name="username"
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                            setUsername(e.target.value);
                            }}
                        />
                </div>
                <div className="mb-3">
                <label className="form-label">password</label>
                    <input
                        name="password"
                        type="password"
                        className="form-control"
                        onChange={(e) => {
                        setPassword(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-3">
                <label className="form-label">email</label>
                    <input
                        name="email"
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                        setEmail(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <input className="btn btn-primary" type="submit" value="Register" />
                </div>
            </form>
        </div>
    </div>
    );
};

export default SignupForm;
