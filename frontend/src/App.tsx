import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import useAuthContext from "./hooks/useAuthContext";

import { Loader } from "lucide-react";

function App() {
  const { authUser, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader size={100} color="#36d7b7" className="animate-spin"/>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 flex items-center justify-center w-full">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUp /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
