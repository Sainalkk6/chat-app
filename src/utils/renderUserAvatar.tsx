import Image from "next/image";

export const renderUserAvatar = (photoUrl: string) => {
  return (
    // <div className="flex items-center justify-center relative rounded-full overflow-hidden">
      <Image height={30} width={60} className="object-cover rounded-full" src={photoUrl} alt="User Profile" priority unoptimized />
    // </div>
  );
};
