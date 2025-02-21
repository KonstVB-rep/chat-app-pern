import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext, AuthUserType } from "./AuthContext";

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const valueContext = {
        authUser,
        setAuthUser,
        loading,
        setLoading,
        error,
        setError
    }


    useEffect(() => {
      const fetchAuthUser = async () => {
        try {
          setError(null);
          const response = await fetch('/api/auth/me')

          if (!response.ok) {
            throw new Error('Failed to fetch auth user');
          }
          const data = await response.json();
          setAuthUser(data);
        } catch (error) {
          console.log(error);
          setError((error as Error).message);
        } finally {
          setLoading(false);
        }
      }

      fetchAuthUser();
    }, [])

  return (
    <AuthContext.Provider value={valueContext}>
      {children}
    </AuthContext.Provider>
  );
};