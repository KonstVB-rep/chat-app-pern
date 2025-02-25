import { useLogin } from "@/pages/Login/hooks/useLogin";
import FormButtonSubmit from "@/shared/components/FormButtonSubmit";
import FormField from "@/shared/components/FormField";

import { Link } from "react-router";

const LoginForm = () => {
  const { error, onSubmit } = useLogin();
  return (
    <form
      className="flex flex-col gap-3 pb-2 pt-10 text-sm group"
      action={onSubmit}
    >
      <FormField
        error={error.username ? error.username[0] : ""}
        type="text"
        placeholder="Enter username"
        name="username"
        label="Username"
      />

      <FormField
        error={error.password ? error.password[0] : ""}
        type="password"
        placeholder="Enter Password"
        name="password"
        label="Password"
      />

      <Link
        to="/signup"
        className="text-sm hover:underline touch:active:underline underline-offset-4 text-white mt-2 inline-block"
      >
        {"Don't"} have an account?
      </Link>

      <div className="flex flex-col gap-2">
        <FormButtonSubmit title="Login" />
      </div>
    </form>
  );
};

export default LoginForm;
