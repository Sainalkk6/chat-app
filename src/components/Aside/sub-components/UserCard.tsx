"use client";
import { useReceiverContext } from "@/providers/ReceiverContextProvider";
import { renderUserAvatar } from "@/utils/renderUserAvatar";
import dayjs from "dayjs";

interface UserCard {
  photoUrl: string;
  username: string;
  timestamp?: string;
  lastMessage?: string;
  userId: string;
}

const UserCard = ({ photoUrl, username, timestamp, userId, lastMessage }: UserCard) => {
  const { handleSetReceiverUid } = useReceiverContext();
  const formattedTime = dayjs(timestamp).format("h:mm A");

  const renderUserInfo = () => {
    return (
      <div className="flex flex-col justify-center">
        <span className="text-text-dark cursor-default capitalize text-[22px] font-medium">{username}</span>
        <span className="text-field-label font-medium">{lastMessage || "No messages yet"}</span>
      </div>
    );
  };

  return (
    <div onClick={() => handleSetReceiverUid(userId)} className="flex py-5 cursor-pointer">
      <div className="flex gap-4 w-full">
        {renderUserAvatar(photoUrl)}
        {renderUserInfo()}
      </div>
      <div className="flex flex-col text-nowrap">        <span className="text-field-label text-lg">{formattedTime}</span>
      </div>
    </div>
  );
};

export default UserCard;
