import { PropsWithChildren, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import SocketContext from "./SocketContext";
import useAuthContext from "@/context/AuthContext/useAuthContext";

const socketURL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";


const SocketProvider = ({ children }: PropsWithChildren) => {
  const socketRef = useRef<Socket | null>(null);

  const { authUser, loading } = useAuthContext();

  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
		if (authUser && !loading) {
			const socket = io(socketURL, {
				query: {
					userId: authUser.id,
				},
			});
			socketRef.current = socket;

			socket.on("getOnlineUsers", (users: string[]) => {
				setOnlineUsers(users);
			});

			return () => {
				socket.close();
				socketRef.current = null;
			};
		} else if (!authUser && !loading) {
			if (socketRef.current) {
				socketRef.current.close();
				socketRef.current = null;
			}
		}
	}, [authUser, loading]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
