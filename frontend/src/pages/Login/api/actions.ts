const fetchLogin = async (_prev: unknown, formData: FormData) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    if (!res.ok) {
      throw new Error("Failed to login");
    }
    return await res.json();
  } catch (error) {
    console.log("Error in login: ", error);
    return { error: (error as Error).message };
  }
};

export default fetchLogin;