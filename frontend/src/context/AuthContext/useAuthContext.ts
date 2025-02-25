import { AuthContext } from "@/context/AuthContext/AuthContext";
import { useContext } from "react";


const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

export default useAuthContext;
