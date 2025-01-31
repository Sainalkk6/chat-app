import { renderUserAvatar } from "@/utils/renderUserAvatar";

interface RecieverStripInterface {
  photoUrl: string;
  username: string;
  isOnline?: boolean;
}

const ReceiverStrip = ({ photoUrl, username, isOnline }: RecieverStripInterface) => {
  return (
    <div className="flex p-9 items-center gap-4">
      {renderUserAvatar(photoUrl)}
      <span className="text-xl font-medium">{username}</span>
    </div>
  );
};

export default ReceiverStrip;
