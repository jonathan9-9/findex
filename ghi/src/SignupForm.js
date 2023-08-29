// import { useState } from "react";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import { useNavigate } from "react-router-dom";

// const SignupForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const { register } = useToken();
//   const navigate = useNavigate();

//   const handleRegistration = (e) => {
//     e.preventDefault();
//     const accountData = {
//       username: username,
//       password: password,
//       email: email,
//       first_name: firstName,
//       last_name: lastName,
//     };
//     register(accountData,`${process.env.REACT_APP_API_HOST}/api/users`);
//     e.target.reset();
//     navigate("/");
//   };

//     return (
//     <div className="card text-bg-light mb-3">
//         {/* <h5 className="card-header">Signup</h5> */}
//         <div className="card-body">
//             <form onSubmit={(e) => handleRegistration(e)}>
//                 <div className="mb-3">
//                     <label className="form-label">first name</label>
//                         <input
//                             name="firstName"
//                             type="text"
//                             className="form-control"
//                             onChange={(e) => {
//                             setFirstName(e.target.value);
//                             }}
//                         />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">last name</label>
//                         <input
//                             name="lastName"
//                             type="text"
//                             className="form-control"
//                             onChange={(e) => {
//                             setLastName(e.target.value);
//                             }}
//                         />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">username</label>
//                         <input
//                             name="username"
//                             type="text"
//                             className="form-control"
//                             onChange={(e) => {
//                             setUsername(e.target.value);
//                             }}
//                         />
//                 </div>
//                 <div className="mb-3">
//                 <label className="form-label">password</label>
//                     <input
//                         name="password"
//                         type="password"
//                         className="form-control"
//                         onChange={(e) => {
//                         setPassword(e.target.value);
//                         }}
//                     />
//                 </div>
//                 <div className="mb-3">
//                 <label className="form-label">email</label>
//                     <input
//                         name="email"
//                         type="text"
//                         className="form-control"
//                         onChange={(e) => {
//                         setEmail(e.target.value);
//                         }}
//                     />
//                 </div>
//                 <div>
//                     <input className="btn btn-primary" type="submit" value="Register" />
//                 </div>
//             </form>
//         </div>
//     </div>
//     );
// };

// export default SignupForm;


import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showModal, setShowModal] = useState(false); // State variable for the modal
  const { register } = useToken();
  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();

    // Check if all required fields are filled out
    if (!username || !password || !email || !firstName || !lastName) {
      // Display the modal or alert message
      setShowModal(true);
      return; // Exit the function to prevent registration
    }

    const accountData = {
      username: username,
      password: password,
      email: email,
      first_name: firstName,
      last_name: lastName,
    };

    register(accountData, `${process.env.REACT_APP_API_HOST}/api/users`);
    e.target.reset();
    navigate("/");
  };

//   return (
//     <div className="card text-bg-light mb-3">
//       <div className="card-body">
//         <form onSubmit={(e) => handleRegistration(e)}>
//            <div className="mb-3">
//                     <label className="form-label">first name</label>
//                         <input
//                             name="firstName"
//                             type="text"
//                             className="form-control"
//                             onChange={(e) => {
//                             setFirstName(e.target.value);
//                             }}
//                         />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">last name</label>
//                         <input
//                             name="lastName"
//                             type="text"
//                             className="form-control"
//                             onChange={(e) => {
//                             setLastName(e.target.value);
//                             }}
//                         />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">username</label>
//                         <input
//                             name="username"
//                             type="text"
//                             className="form-control"
//                             onChange={(e) => {
//                             setUsername(e.target.value);
//                             }}
//                         />
//                 </div>
//                 <div className="mb-3">
//                 <label className="form-label">password</label>
//                     <input
//                         name="password"
//                         type="password"
//                         className="form-control"
//                         onChange={(e) => {
//                         setPassword(e.target.value);
//                         }}
//                     />
//                 </div>
//                 <div className="mb-3">
//                 <label className="form-label">email</label>
//                     <input
//                         name="email"
//                         type="text"
//                         className="form-control"
//                         onChange={(e) => {
//                         setEmail(e.target.value);
//                         }}
//                     />
//                 </div>
//           <div>
//             <button className="btn btn-primary" type="submit">
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//       {showModal && (
//         <div className="modal-container shake">
//           <div className="modal-content py-4 text-left px-6">
//             <div className="flex justify-between items-center pb-3">
//               <p className="text-2xl font-bold">Modal Title</p>
//               <button
//                 className="modal-close p-2 -mt-2 -mr-2 rounded-full hover:bg-gray-300"
//                 onClick={() => setShowModal(false)}
//               >
//                 <svg
//                   className="h-6 w-6"
//                   role="button"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                 >
//                   <title>Close</title>
//                   <path
//                     fill="#000000"
//                     d="M14.348 5.293a1 1 0 010 1.414L11.415 10l2.933 2.293a1 1 0 01-1.414 1.414L10 11.415l-2.293 2.933a1 1 0 01-1.414-1.414L8.586 10 5.293 7.707a1 1 0 111.414-1.414L10 8.586l2.933-2.933a1 1 0 011.415 0z"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <p>Please fill out all required fields.</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SignupForm;


return(
  <div className="max-w-md mx-auto">
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Signup</h2>
      <form onSubmit={(e) => handleRegistration(e)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            First Name
          </label>
          <input
            name="firstName"
            type="text"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Name
          </label>
          <input
            name="lastName"
            type="text"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            name="username"
            type="text"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            name="email"
            type="text"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
    {showModal && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
      <div className="modal-container shake">
        <div className="modal-content py-4 text-left px-6 bg-white">
          <div className="flex justify-between items-center pb-3">
            <p className="text-xl text-red-600 font-bold">This field should not be null</p>
            <button
              className="modal-close p-2 -mt-2 -mr-2 rounded-full hover:bg-gray-300"
              onClick={() => setShowModal(false)}
            >
              <svg
                className="h-6 w-6"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path
                  fill="#000000"
                  d="M14.348 5.293a1 1 0 010 1.414L11.415 10l2.933 2.293a1 1 0 01-1.414 1.414L10 11.415l-2.293 2.933a1 1 0 01-1.414-1.414L8.586 10 5.293 7.707a1 1 0 111.414-1.414L10 8.586l2.933-2.933a1 1 0 011.415 0z"
                />
              </svg>
            </button>
          </div>
          <p>Please fill out all required fields.</p>
        </div>
      </div>
    </div>
      )}
  </div>
)

  }
export default SignupForm
