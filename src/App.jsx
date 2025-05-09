import "./App.css";
import { Route, Routes, Outlet } from "react-router-dom";
import { Login } from "../components/auth/Login.jsx";
import { CustomerViews } from "../components/views/CustomerViews.jsx";
import { Register } from "../components/auth/Register.jsx";


export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<CustomerViews />} />
    </Routes>
  );
};
