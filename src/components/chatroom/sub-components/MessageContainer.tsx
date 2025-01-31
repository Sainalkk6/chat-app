"use client";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DefaultEventsMap } from "socket.io";
import { Socket } from "socket.io-client";
import { ChatType, UserData } from "..";
import Message from "./message";

interface MessageContainerInterface {
  messages: ChatType;
  receiver: UserData;
  sender: UserData;
  setMessages: React.Dispatch<React.SetStateAction<ChatType>>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  id: number;
}

type MessageType = {
  senderId: string;
  receiverId: string;
  timestamp: number;
  message: string;
  roomId: number;
};

const MessageContainer = ({ messages, receiver, sender, socket, setMessages, id }: MessageContainerInterface) => {
  const [message, setMessage] = useState("");
  const messageContainerRef = useRef<HTMLDivElement | null>(null)

  function receive_msg(data: MessageType) {
    setMessages((prev) => {
      return { ...prev, messages: [...(prev?.messages ?? []), { message: data.message, receiverId: data.receiverId, senderId: data.senderId, timestamp: `${data.timestamp}` }] };
    });
  }

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_msg", receive_msg);
    return () => {
      socket.off("receive_msg", receive_msg);
    };
  }, [socket]);

  const renderMessages = useCallback(() => {
    if (!messages || !messages.messages) {
      return (
        <div className="flex items-center relative justify-center w-full">
          <span className="text-xl font-medium absolute text-center top-[300px]">
            No messages yet. <br /> Be the first one to say hi !
          </span>
        </div>
      );
    }

    return messages.messages.map((message) => {
      const isSender = sender.uid === message.senderId;
      const userType: "sender" | "receiver" = isSender ? "sender" : "receiver";
      const profile = isSender ? sender.photoURL : receiver.photoURL;
      const username = isSender ? sender.displayName : receiver.displayName;
      const formattedTime = dayjs(Number(message.timestamp)).format("h:mm A");
      return <Message key={message.timestamp} message={message.message} profileImage={profile || ""} timeStamp={formattedTime} userType={userType} username={username ?? ""} />;
    });
  }, [messages]);

  const handleSendMessage = async () => {
    if (message !== "") {
      const messageData: MessageType = {
        message,
        receiverId: receiver.uid ?? "",
        senderId: sender.uid ?? "",
        timestamp: Date.now(),
        roomId: id,
      };
      await socket?.emit("send_message", messageData);
      setMessage("");
    }
  };

  const handleKeyDown = (key: React.KeyboardEvent<HTMLInputElement>) => {
    if (key.key === "Enter") handleSendMessage();
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-y-auto h-[700px] no-scrollbar">
      {renderMessages()}
      </div>
      <div className="flex w-full gap-2 items-center p-4 rounded-3xl">
        <input onKeyDown={(key) => handleKeyDown(key)} type="text" onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Type a message..." className="py-1 px-5 h-16 items-center w-full  rounded-full border border-[#bcbcbc] outline-none text-text-dark font-medium text-xl" />
        <button onClick={handleSendMessage} className="flex items-center justify-center py-3 px-[10px]  text-white rounded-full bg-new-message cursor-pointer disabled:cursor-not-allowed disabled:opacity-80">
          <img src="/icons/send-icon.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default MessageContainer;
