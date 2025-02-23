import { Link } from "react-router-dom";
import FormButtonSubmit from "@shared/components/FormButtonSubmit";
import FormField from "@shared/components/FormField";
import GenderRadio from "@shared/components/GenderRadio";
import { useSignUp } from "@/pages/SignUp/hooks/useSignUp";

export const SignUpForm = () => {
  const { error, onSubmit } = useSignUp();

  return (
    <form className="flex flex-col gap-3 pb-2 pt-10 text-xs group" action={onSubmit}>
      <FormField
        type="text"
        name="fullName"
        label="FullName"
        placeholder="FullName"
      />

      <FormField
        type="text"
        name="username"
        label="Username"
        placeholder="Username"
      />

      <FormField
        type="password"
        name="password"
        label="Password"
        placeholder="Password"
      />

      <FormField
        error={error?.confirmPassword?.[0] || ""}
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm Password"
      />

      <GenderRadio />
      {error?.gender && <span className="text-xs text-red-500">{error.gender[0]}</span>}

      <Link to={"/login"} className="text-sm hover:underline underline-offset-4 inline-block py-2 text-white">
        Already have an account?
      </Link>
      <div className="flex flex-col gap-2">
        <FormButtonSubmit title="Sign Up" />
      </div>
    </form>
  );
};
