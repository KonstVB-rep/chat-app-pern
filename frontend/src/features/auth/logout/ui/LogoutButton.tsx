import { LogOut } from "lucide-react";
import useLogout from "../hooks/useLogout";


const LogoutButton = () => {

  const logout = useLogout();

  return (
    <>
      <button className="w-full flex justify-center border-2 border-[var(--primary-color)] md:border-none md:w-fit text-[var(--primary-color)] cursor-pointer p-2 rounded-full touch:active:bg-[var(--primary-color)] touch:active:text-white hover:bg-[var(--primary-color)] focus-visible:bg-[var(--primary-color)] hover:text-white focus-visible:text-white" title="Logout" aria-label="Logout">
        <LogOut
          className="w-6 h-6 "
          onClick={logout}
        />
      </button>
    </>
  );
};
export default LogoutButton;
