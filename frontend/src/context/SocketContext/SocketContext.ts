import { createContext } from "react";
import { Socket } from 'socket.io-client';


export type SocketContextType = {
    socket: Socket | null;
    onlineUsers: string[]
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export default SocketContext;