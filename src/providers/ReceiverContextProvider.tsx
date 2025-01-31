"use client";
import React, { createContext, useContext, useState } from "react";

interface ReceiverContextInterface {
  receiverUid: string;
  handleSetReceiverUid: (id: string) => void;
}

const ReceiverContext = createContext<ReceiverContextInterface>({} as ReceiverContextInterface);

export const ReceiverContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [receiverUid, setreceiverUid] = useState("");
  const handleSetReceiverUid = (id: string) => {
    setreceiverUid(id);
  };
  return <ReceiverContext.Provider value={{ handleSetReceiverUid, receiverUid }}>{children}</ReceiverContext.Provider>;
};

export const useReceiverContext = () => useContext(ReceiverContext);
