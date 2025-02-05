"use client";
import { httpClient } from "@/lib/client";
import { useReceiverContext } from "@/providers/ReceiverContextProvider";
import { useSocket } from "@/providers/SocketProvider";
import { Endpoints } from "@/utils/enpoints";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import MessageContainer from "./sub-components/MessageContainer";
import ReceiverStrip from "./sub-components/receiverStrip";

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

export type statusType = {
  senderId: string;
  status: boolean;
};

const Chatroom = () => {
  const socket = useSocket();
  const { receiverUid } = useReceiverContext();
  const [messages, setMessages] = useState<ChatType>({} as ChatType);
  const [typing, setTyping] = useState({} as statusType);
  const [isOnline, setIsOnline] = useState({} as statusType);
  const [recieverData, setRecieverData] = useState<UserData>({} as UserData);
  const [senderData, setSenderData] = useState<UserData>({} as UserData);
  const [id, setId] = useState<number>();

  useEffect(() => {
    //get the current receiver's details
    const getUser = async () => {
      if (receiverUid) {
        const client = await httpClient();
        const getUser = await client.get(Endpoints.getUser(receiverUid));
        const data = getUser.data;
        setRecieverData(data);
      }
    };

    //get the chat with the current user
    const userCookie = Cookies.get("user");
    const user = userCookie && JSON.parse(userCookie || "");
    const str = user && receiverUid + user.uid;

    const numbers = (str && str.match(/\d+/g)?.sort().join("")) || "";

    receiverUid && setId(Number(numbers));

    const getChat = async () => {
      setSenderData(user);
      if (user && receiverUid) {
        const client = await httpClient();
        const getUserConversations = await client.get(Endpoints.getUserConversations(user.uid, receiverUid));
        const data: ChatType = getUserConversations.data;
        const roomId = data && data.roomId ? data.roomId : Number(numbers);
        socket!.emit("join_room", roomId);
        setMessages(data);
      }
    };

    if (!socket) return;

    socket!.emit("join_room", Number(numbers));

    getChat();
    getUser();
  }, [receiverUid]);

  const handleTypingStatus = (status: boolean, senderId: string) => setTyping({ senderId, status });

  if (!recieverData) return <span>Loading...</span>;

  return (
    <div className="flex w-full bg-default flex-col rounded-2xl">
      {recieverData.photoURL && <ReceiverStrip receiverId={receiverUid} senderId={senderData.uid!} typing={typing} isOnline={recieverData.isOnline} photoUrl={recieverData?.photoURL} username={recieverData?.displayName || ""} />}
      <div className="flex overflow-auto no-scrollbar flex-1 flex-col">{receiverUid && id ? <MessageContainer typing={typing.status} handleTypingStatus={handleTypingStatus} id={id} socket={socket} setMessages={setMessages} sender={senderData} receiver={recieverData} messages={messages} /> : <div></div>}</div>
    </div>
  );
};

export default Chatroom;
