import { renderUserAvatar } from "@/components/ui/renderUserAvatar";
import { statusType } from "..";

interface RecieverStripInterface {
  photoUrl: string;
  username: string;
  isOnline?: boolean;
  typing: statusType;
  receiverId: string;
  senderId: string;
}

const ReceiverStrip = ({ photoUrl, username, isOnline, typing, receiverId, senderId }: RecieverStripInterface) => {
  return (
    <div className="flex p-9 pb-5 items-center border-b gap-4" style={{ borderColor: "#cfcfcf" }}>
      {renderUserAvatar(photoUrl)}
      <div className="flex flex-col">
        <span className="text-xl font-medium">{username}</span>
        {receiverId !== typing.senderId && typing.status ? <span className="text-green-600 text-lg">Typing...</span> : <span className="text-white text-lg">``</span>}
      </div>
    </div>
  );
};

export default ReceiverStrip;
