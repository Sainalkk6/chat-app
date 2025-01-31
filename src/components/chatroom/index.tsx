"use client";
import { useReceiverContext } from "@/providers/ReceiverContextProvider";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MessageContainer from "./sub-components/MessageContainer";
import ReceiverStrip from "./sub-components/receiverStrip";
import { useSocket } from "@/providers/SocketProvider";

// export type UserData = {
//   username: string | null;
//   email: string | null;
//   phone: null | string;
//   profileImage: string | undefined;
//   userId?: string | null;
//   isOnline?: boolean;
//   uid?: string | null;
// };

export type UserData = {
  displayName: string | null;
  email: string | null;
  phoneNumber: null | string;
  photoURL: string | undefined;
  uid: string | null;
  isOnline?: boolean;
};

export type ChatType = {
  id: string;
  roomId: string;
  messages: {
    senderId: string;
    receiverId: string;
    timestamp: string;
    message: string;
  }[];
  participants: [string, string];
};

const Chatroom = () => {
  const socket = useSocket();
  const { receiverUid } = useReceiverContext();
  const [messages, setMessages] = useState<ChatType>({} as ChatType);
  const [recieverData, setRecieverData] = useState<UserData>({} as UserData);
  const [senderData, setSenderData] = useState<UserData>({} as UserData);
  const [id, setId] = useState<number>();

  useEffect(() => {
    //get the current receiver's details
    const getUser = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/get-user/${receiverUid}`);
      const data = await response.json();
      setRecieverData(data);
    };

    //get the chat with the current user
    const userCookie = Cookies.get("user");
    const user = userCookie && JSON.parse(userCookie || "");
    const str = user && receiverUid + user.uid;

    const numbers = (str && str.match(/\d+/g)?.sort().join("")) || "";

    receiverUid && setId(Number(numbers));

    const getChat = async () => {
      setSenderData(user);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chats/get-chats?senderid=${user.uid}&receiverId=${receiverUid}`);
      const data: ChatType = await response.json();
      const roomId = data && data.roomId ? data.roomId : Number(numbers);
      socket!.emit("join_room", roomId);
      setMessages(data);
    };
    if (!socket) return;

    socket!.emit("join_room", Number(numbers));

    getChat();
    getUser();
  }, [receiverUid]);

  if (!recieverData) return <span>Loading...</span>;

  return (
    <div className="flex w-full bg-default flex-col gap-7">
      {recieverData.photoURL && <ReceiverStrip isOnline={recieverData.isOnline} photoUrl={recieverData?.photoURL} username={recieverData?.displayName || ""} />}
      <div className="flex overflow-auto no-scrollbar flex-1 flex-col">{receiverUid && id ? <MessageContainer id={id} socket={socket} setMessages={setMessages} sender={senderData} receiver={recieverData} messages={messages} /> : <div></div>}</div>
    </div>
  );
};

export default Chatroom;

///Change the type of user and receiver to be the same
