import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import useAuthContext from "./hooks/useAuthContext";
import { Toaster } from "react-hot-toast";

import { Loader } from "lucide-react";

function App() {
  const { authUser, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader size={100} color="#36d7b7" className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center w-full h-full sm:max-h-[80%]">
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
