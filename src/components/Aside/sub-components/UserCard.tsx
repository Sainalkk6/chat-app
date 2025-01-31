"use client";
import { useReceiverContext } from "@/providers/ReceiverContextProvider";
import { renderUserAvatar } from "@/utils/renderUserAvatar";

interface UserCard {
  photoUrl: string;
  username: string;
  time: string;
  userId: string;
}

const UserCard = ({ photoUrl, username, time, userId }: UserCard) => {
  const { handleSetReceiverUid } = useReceiverContext();

  const renderUserInfo = () => {
    return (
      <div className="flex flex-col justify-center">
        <span className="text-text-dark cursor-default capitalize text-[22px] font-medium">{username}</span>
        <span className="text-field-label cursor-pointer hover:text-text-hover font-medium">Account Info</span>
      </div>
    );
  };

  return (
    <div onClick={() => handleSetReceiverUid(userId)} className="flex py-5 cursor-pointer">
      <div className="flex gap-4 w-full">
        {renderUserAvatar(photoUrl)}
        {renderUserInfo()}
      </div>
      <div className="flex flex-col text-nowrap">
        <span className="text-field-label text-lg">{`10:21 AM`}</span>
      </div>
    </div>
  );
};

export default UserCard;
