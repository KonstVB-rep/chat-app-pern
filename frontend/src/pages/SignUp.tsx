import { Link } from "react-router-dom";
import GenderRadio from "../components/GenderRadio";
import { z } from "zod";
import { useActionState, useState } from "react";
import { LoaderCircle } from "lucide-react";

const SignUpSchema = z
  .object({
    fullname: z
      .string({ required_error: "Fullname is required" })
      .min(1, "Fullname is required")
      .min(3, "Fullname must be at least 6 characters")
      .max(20, "Fullname must be at most 20 characters"),
    username: z
      .string({ required_error: "Username is required" })
      .min(1, "Username is required")
      .min(3, "Fullname must be at least 6 characters")
      .max(20, "Username must be at most 20 characters"),
    password: z
      .string({ required_error: "Password is required" })
      .min(5, "Password must be at least 5 characters"),
    confirmPassword: z
      .string({ required_error: "Password is required" })
      .min(5, "Password must be at least 5 characters"),
    gender: z.enum(["male", "female"], {
      required_error: "Gender is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const fetchSignUp = async (prev: unknown, formData: FormData) => {
  try {
    const data = Object.fromEntries(formData.entries());

    console.log(data, "form data");
    const parsedData = SignUpSchema.safeParse(data);
    if (!parsedData.success) {
      // Возвращаем ошибки в случае неуспешной валидации
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

const SignUp = () => {
  const [state, formAction, isLoading] = useActionState(fetchSignUp, null);

  const [error, setError] = useState<{
    [key: string]: string[];
  } | null>(null);

  console.log(state, "state");

  const onSubmit = async (formData: FormData) => {
    const parsedData = SignUpSchema.safeParse(
      Object.fromEntries(formData.entries())
    );
    if (!parsedData.success) {
      console.log(parsedData.error.flatten().fieldErrors);
      setError(parsedData.error.flatten().fieldErrors);
      return;
    }

    formAction(formData);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center min-w-[300px] max-w-[80vw] md:max-w-[600px] mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400/30 backdrop-blur-xs">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form
          className="flex flex-col gap-3 py-2 uppercase text-xs"
          action={onSubmit}
        >
          <div className="flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              name="fullname"
              className="w-full input input-bordered  h-10"
            />
            {error?.fullname && (
              <span className="text-xs text-red-500">{error.fullname[0]}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="label ">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full input input-bordered h-10"
              name="username"
            />
            {error?.username && (
              <span className="text-xs text-red-500">{error.username[0]}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              name="password"
            />
            {error?.password && (
              <span className="text-xs text-red-500">{error.password[0]}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              name="confirmPassword"
            />
            {error?.confirmPassword && (
              <span className="text-xs text-red-500">
                {error.confirmPassword[0]}
              </span>
            )}
          </div>

          <GenderRadio />
          {error?.gender && (
            <span className="text-xs text-red-500">{error.gender[0]}</span>
          )}

          <Link
            to={"/login"}
            className="text-sm hover:underline underline-offset-4 inline-block py-2 text-white"
          >
            Already have an account?
          </Link>

          <div>
            <button className="btn btn-soft btn-success w-full btn-sm uppercase text-xs">
              {isLoading ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
          {state?.error && (
            <span className="text-xs text-red-500">{state.error}</span>
          )}
        </form>
      </div>
    </div>
  );
};
export default SignUp;
