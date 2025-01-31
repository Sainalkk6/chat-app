"use client";
import { useAuth } from "@/providers/AuthContextProvider";
import { renderUserAvatar } from "@/utils/renderUserAvatar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export type UserData = {
  displayName: string | null;
  email: string | null;
  phoneNumber: null | string;
  photoURL: string | undefined;
  uid: string | null;
};

const ProfileStrip = () => {
  const { user } = useAuth() ?? {};
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    if (user && user.providerData) {
      const getData = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/get-user/${user.uid}`);
        const data = await response.json();
        const userInfo = { displayName: data.displayName, email: data.email, phoneNumber: data.phoneNumber, photoURL: data.photoURL, uid: data.uid };
        setUserData(userInfo);
        Cookies.set("user", JSON.stringify(userInfo));
      };
      getData();
    }
  }, [user]);

  if (!user || userData == undefined) return <span>Loading...</span>;

  const renderUserInfo = () => {
    return (
      <div className="flex flex-col justify-center">
        <span className="text-text-dark cursor-default capitalize text-[22px] font-medium">{userData.displayName}</span>
        <span className="text-field-label cursor-pointer hover:text-text-hover font-medium">Account Info</span>
      </div>
    );
  };

  return (
    <div className="flex items-center py-5 gap-4 w-full">
      {renderUserAvatar(userData.photoURL!)}
      {renderUserInfo()}
    </div>
  );
};

export default ProfileStrip;
