import Conversations from "../../entities/conversations/ui/Conversations";
import LogoutButton from "../../features/auth/logout/ui/LogoutButton";
import AuthUser from "./ui/AuthUser";
import SearchInput from "./ui/SearchInput";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-1 md:p-4 flex flex-col w-44 md:w-1/2 gap-2">
      <div>
        <SearchInput />
        <div className="divider px-3 m-0" />
      </div>
      <div>
        <AuthUser />
        <Conversations />
        <LogoutButton />
      </div>
    </div>
  );
};
export default Sidebar;
