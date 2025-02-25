import useAuthContext from "@/context/AuthContext/useAuthContext";

const AuthUser = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex flex-col gap-1">
      <p className="text-md text-[var(--primary-color)] text-start fonr-semibold">
        Profile
      </p>
      <div className="flex flex-col items-center md:items-start md:flex-row gap-2 border-b border-[#A1AAB8] p-2">
        <img
          className="w-10 h-10 rounded-full"
          src={authUser?.profileImage}
          alt=""
        />
        <div className="flex flex-col gap-1 justify-center items-start">
          <p className="text-xs text-[var(--primary-color)]">
            <span className="font-semibold">Full name: </span>
            <span>{authUser?.fullName}</span>
          </p>
          <p className="text-xs text-[var(--primary-color)]">
            <span className="font-semibold">Username: </span>
            <span>{authUser?.username}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthUser;
