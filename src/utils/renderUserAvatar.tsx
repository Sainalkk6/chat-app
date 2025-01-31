import Image from "next/image";

export const renderUserAvatar = (photoUrl: string) => {
  return (
    <div className="flex items-center justify-center relative rounded-full w-[50px] h-[50px] overflow-hidden">
      <Image className="object-cover rounded-full" src={photoUrl ?? null} alt="User Profile" priority fill unoptimized />
    </div>
  );
};
