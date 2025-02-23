import SignUpSchema from "../model/schema";

const fetchSignUp = async (_prev: unknown, formData: FormData) => {
  try {
    const data = Object.fromEntries(formData.entries());

    const parsedData = SignUpSchema.safeParse(data);
    if (!parsedData.success) {
      return { error: parsedData.error.flatten() };
    }
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to sign up");
    }

    return await response.json();
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export default fetchSignUp;
