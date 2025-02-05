import Image from "next/image";

export const renderUserAvatar = (photoUrl: string) => {
  return (
    <div className="flex h-[55px] w-[55px] items-center justify-center relative rounded-full overflow-hidden">
      <Image height={10} width={60} className="object-cover rounded-full" src={photoUrl} alt="User Profile" priority unoptimized style={{height:"60px"}}/>
    </div>
  );
};
