import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login.jsx";
// import { CustomerViews } from "../components/views/CustomerViews.jsx";
import { Register } from "../components/auth/Register.jsx";
import { Authorized } from "../components/views/Authorized.jsx";
import { ApplicationViews } from "../components/views/ApplicationViews.jsx";


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
