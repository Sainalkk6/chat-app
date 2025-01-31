"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:1100");
    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    // Handle connection errors
    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });
    setSocket(newSocket);
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};
