import useAuthContext from "@hooks/useAuthContext";

const fetchLogout = async () => {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to logout");
    }
  } catch (error) {
    return { error: (error as Error).message };
  }
};

const useLogout = () => {
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    const confirmLogout = confirm("You are logged out");
    if (confirmLogout) {
      await fetchLogout();
      setAuthUser(null);
    }
  };

  return logout;
};

export default useLogout;
