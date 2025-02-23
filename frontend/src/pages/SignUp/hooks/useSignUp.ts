import { useActionState, useEffect, useState } from "react";
import fetchSignUp from "../api/actions";
import SignUpSchema from "../model/schema";
import useAuthContext from "@/hooks/useAuthContext";
import toast from "react-hot-toast";

export const useSignUp = () => {
  const { setAuthUser } = useAuthContext();
  const [state, formAction] = useActionState(fetchSignUp, null);
  const [error, setError] = useState<{
    fullName?: string[];
    username?: string[];
    password?: string[];
    confirmPassword?: string[];
    gender?: string[];
  } | null>(null);

  const onSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const parsedData = SignUpSchema.safeParse(data);

    if (!parsedData.success) {
      setError(parsedData.error.flatten().fieldErrors);
      return;
    }

    formAction(formData);
  };

  useEffect(() => {
    if (state && !state.error) {
      setAuthUser(state);
      return;
    }
    if (state?.error)
      toast.error(state.error, {
        duration: 5000,
        position: "top-center",
        icon: "🚫",
      });
  }, [setAuthUser, state]);

  return {
    state,
    error,
    onSubmit,
  };
};
