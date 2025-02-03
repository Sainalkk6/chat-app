import { renderUserAvatar } from "@/utils/renderUserAvatar";

interface RecieverStripInterface {
  photoUrl: string;
  username: string;
  isOnline?: boolean;
  typing: { senderId: string; typing: boolean };
  receiverId: string;
  senderId: string;
}

const ReceiverStrip = ({ photoUrl, username, isOnline, typing, receiverId, senderId }: RecieverStripInterface) => {
  return (
    <div className="flex p-9 pb-5 items-center border-b gap-4" style={{ borderColor: "#cfcfcf" }}>
      {renderUserAvatar(photoUrl)}
      <div className="flex flex-col">
        <span className="text-xl font-medium">{username}</span>
        {receiverId !== typing.senderId && typing.typing ? <span className="text-green-600 text-lg">Typing...</span> : <span className="text-white text-lg">``</span>}
      </div>
    </div>
  );
};

export default ReceiverStrip;
