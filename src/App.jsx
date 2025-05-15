// import "./App.css";
// import { useState, useEffect } from "react";
// import { Route, Routes } from "react-router-dom";
// import { Login } from "../components/auth/Login.jsx";
// import { Register } from "../components/auth/Register.jsx";
// import { Authorized } from "../components/views/Authorized.jsx";
// import { ApplicationViews } from "../components/views/ApplicationViews.jsx";
// import "./theme.css"; // <-- Import your theme styles

// export const App = () => {
//   const [theme, setTheme] = useState("cyberpunk");

//   useEffect(() => {
//     document.body.className = theme;
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "cyberpunk" ? "vinyl" : "cyberpunk"));
//   };

//   return (
//     <>
//       <header style={{ padding: "1rem", textAlign: "center" }}>
//         <button className="button" onClick={toggleTheme}>
//           Toggle Theme
//         </button>
//       </header>

//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route
//           path="*"
//           element={
//             <Authorized>
//               <ApplicationViews />
//             </Authorized>
//           }
//         />
//       </Routes>
//     </>
//   );
// };



// import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login.jsx";
// import { CustomerViews } from "../components/views/CustomerViews.jsx";
import { Register } from "../components/auth/Register.jsx";
import { Authorized } from "../components/views/Authorized.jsx";
import { ApplicationViews } from "../components/views/ApplicationViews.jsx";
import "./cyberPunk.css"



export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={
       // Check if the user is authorized first
        <Authorized>
          {/* ApplicationViews is the CHILD component of Authorized. */}
          <ApplicationViews />
        </Authorized>
      }
        />
    </Routes>
  );
};
