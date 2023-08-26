// import useToken from "@galvanize-inc/jwtdown-for-react";
// import { Link, useNavigate } from "react-router-dom";

// const TitleBar = () => {
//   const { logout, token } = useToken();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   const signupButton = (
//     <Link to="/signup" className="btn btn-primary">
//       Sign Up
//     </Link>
//   );

//   const logoutButton = (
//     <button onClick={handleLogout} className="btn btn-danger">
//       Logout
//     </button>
//   );

//   return (
//     <div className="mt-3">
//       <div className="btn-toolbar" role="toolbar">
//         <div className="btn-group mb-3" role="group">
//           {token ? logoutButton : signupButton}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TitleBar;
