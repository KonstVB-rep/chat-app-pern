
import MessageContainer from "@/entities/messages/ui/MessageContainer";
import useAuthContext from "@/hooks/useAuthContext";
import Sidebar from "@/widgets/sidebar";
import { Loader } from "lucide-react";


const Home = () => {
  const { loading  } = useAuthContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader size={100} color="#36d7b7" className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex w-full h-full md:max-w-screen-lg rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;
