import MessageContainer from "@/entities/messages/ui/MessageContainer";
import useAuthContext from "@/context/AuthContext/useAuthContext";
import Sidebar from "@/widgets/sidebar";
import { Loader } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const { loading } = useAuthContext();
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader size={100} color="#36d7b7" className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex w-full h-full relative lg:max-w-screen-lg rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {openSidebar && <Sidebar setOpenSidebar={setOpenSidebar} />}
      <MessageContainer setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
    </div>
  );
};
export default Home;
