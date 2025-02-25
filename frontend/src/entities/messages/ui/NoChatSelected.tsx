import useAuthContext from "@/context/AuthContext/useAuthContext";
import { MessageCircle } from "lucide-react";
const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full flex-1 bg-[var(--primary-color)] rounded-b-lg">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <MessageCircle className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default NoChatSelected;
