import useAuthContext from "@/hooks/useAuthContext";

const AuthUser = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex flex-col gap-1">
      <p className="text-md text-[var(--primary-color)] text-start fonr-semibold">You</p>
      <div className="flex gap-2 border-b border-slate-500 p-2">
        <img
          className="w-10 h-10 rounded-full"
          src={authUser?.profileImage}
          alt=""
        />
        <div className="flex flex-col gap-1 justify-center items-start">
          <p className="text-xs text-[var(--primary-color)]">
            Full name: {authUser?.fullName}
          </p>
          <p className="text-xs text-[var(--primary-color)]">
            Username: {authUser?.username}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthUser;
