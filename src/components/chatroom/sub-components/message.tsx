import { RefObject } from "react";

export interface MessageInterface {
  userType: "sender" | "receiver";
  message: string;
  profileImage: string;
  username: string;
  timeStamp: string | number;
}

const Message = ({ userType, timeStamp, username, profileImage, message }: MessageInterface) => {
  const userDetails = () => {
    return (
      <div className={`flex ${userType === "sender" ? "flex-row" : "flex-row-reverse"} flex items-center gap-6`}>
        <img src={profileImage} alt="user-avatar" className="rounded-full w-[50px] h-[50px] object-cover" />
        <div className="flex items-center gap-4">
          <span className="text-text-dark text-2xl font-medium">{username}</span>
          <div className="w-1 h-1 bg-black" />
          <span className="text-field-label text-xl font-medium">{timeStamp}</span>
        </div>
      </div>
    );
  };

  const renderMessage = () => {
    return (
      <div className={`flex pr-16 flex-col justify-center ${userType === "sender" ? "items-start" : "items-end"} gap-1`}>
        <div className={`${userType === "sender" ? "bg-message-bubble-send text-text-dark" : "bg-message-bubble-received text-white"} flex w-fit p-4 min-w-24 items-center justify-center rounded-3xl border border-default-border-color `}>
          <p className=" text-xl break-words max-w-[470px] font-medium">{message}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col justify-center gap-1 ${userType === "sender" ? "items-start" : "items-end"}`}>
      <div className="flex flex-col p-6 gap-4">
        {userDetails()}
        {renderMessage()}
      </div>
    </div>
  );
};

export default Message;
