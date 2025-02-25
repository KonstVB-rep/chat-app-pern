import Conversations from "@/entities/conversations/ui/Conversations";
import LogoutButton from "@features/auth/logout/ui/LogoutButton";
import AuthUser from "./ui/AuthUser";
import SearchInput from "./ui/SearchInput";
import { ChevronLeft } from "lucide-react";

type SidebarProps = {
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ setOpenSidebar }: SidebarProps) => {
  return (
    <div className="absolute z-10 pb-[22px] min-w-[280px] left-0 top-0 h-full md:static border-r bg-gray-400 border-slate-500 pt-1 px-2 md:pl-4 md:pt-4 flex-col w-1/3 gap-2 flex">
      <div>
        <div className="flex items-center justify-between gap-2">
          <SearchInput />
          <button
            onClick={() => setOpenSidebar((prev) => !prev)}
            title="Close sidebar"
            aria-label="Close sidebar"
            className="flex relative justify-center md:w-fit text-[var(--primary-color)] cursor-pointer p-2 rounded-full touch:active:bg-[var(--primary-color)] touch:active:text-white hover:bg-[var(--primary-color)] focus-visible:bg-[var(--primary-color)] hover:text-white focus-visible:text-white"
          >
            <ChevronLeft />
          </button>
        </div>
        <div className="divider px-3 m-0" />
      </div>
      <div className="grid h-full grid-rows-[auto_1fr_auto] overflow-hidden">
        <AuthUser />
        <Conversations />
        <LogoutButton />
      </div>
    </div>
  );
};
export default Sidebar;
