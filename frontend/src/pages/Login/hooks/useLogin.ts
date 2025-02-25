import { useActionState, useEffect, useState } from "react";
import useAuthContext from "@/context/AuthContext/useAuthContext";
import fetchLogin from "../api/actions";
import FormLoginSchema from "../model/schema";
import toast from "react-hot-toast";

export const useLogin = () => {
  const { setAuthUser } = useAuthContext();
  const [state, formAction] = useActionState(fetchLogin, null);
  const [error, setError] = useState<{
    username?: string[];
    password?: string[];
  }>({});

  const onSubmit = (formData: FormData) => {
    const trimFormData = new FormData();

    for (const [key, value] of formData.entries()) {
      trimFormData.append(key, value.toString().trim());
    }
    const parsedData = FormLoginSchema.safeParse(
      Object.fromEntries(trimFormData.entries())
    );
    if (!parsedData.success) {
      setError(parsedData.error.flatten().fieldErrors);
      return;
    }
    formAction(trimFormData);
  };

  useEffect(() => {
    if (state && !state.error) {
      setAuthUser(state);
    }
    if (state?.error)
      toast.error(state.error, {
        duration: 5000,
        position: "top-center",
        icon: "🚫",
      });
  }, [setAuthUser, state]);

  return {
    error,
    onSubmit,
  };
};
