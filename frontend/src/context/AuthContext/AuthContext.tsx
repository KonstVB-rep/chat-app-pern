import { createContext, Dispatch, SetStateAction } from "react";

type AuthContextType<T> = {
    authUser: T | null;
    setAuthUser: Dispatch<SetStateAction<T | null>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    error: string | null;
    setError: Dispatch<SetStateAction<string | null>>;
}

export type AuthUserType =  {
    id: string;
    fullname: string;
    email: string;
    profileImage: string;
    gender: Gender;
}

enum Gender {
    male,
    female
}

export const AuthContext = createContext<AuthContextType<AuthUserType>>({
    authUser: null,
    setAuthUser: () => {},
    loading: false,
    setLoading: () => {},
    error: null,
    setError: () => {}
});
