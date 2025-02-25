import { useContext } from "react";
import SocketContext, { SocketContextType } from "./SocketContext";


const useSocketContext = ():SocketContextType => {
    const context = useContext(SocketContext);

    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }

    return context;
}

export default useSocketContext;