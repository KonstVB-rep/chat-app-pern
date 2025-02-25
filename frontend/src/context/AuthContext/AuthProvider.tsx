import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext, AuthUserType } from "./AuthContext";
import toast from "react-hot-toast";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const valueContext = {
    authUser,
    setAuthUser,
    loading,
    setLoading,
  };

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const response = await fetch("/api/auth/me");

        if (!response.ok) {
          throw new Error("Failed to fetch auth user");
        }
        const data = await response.json();
        setAuthUser(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch auth user", {
          id: "auth-error",
          duration: 5000,
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
};
