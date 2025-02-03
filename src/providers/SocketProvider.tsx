"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_SOCKET_PORT}`, { transports: ["websocket"] });
    newSocket.on("connect", () => {});

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
