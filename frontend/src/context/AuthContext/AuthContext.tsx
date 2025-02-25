import { createContext, Dispatch, SetStateAction } from "react";

type AuthContextType<T> = {
    authUser: T | null;
    setAuthUser: Dispatch<SetStateAction<T | null>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

export type AuthUserType =  {
    id: string;
    fullName: string;
    username: string;
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
});
