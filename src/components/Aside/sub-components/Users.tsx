"use client";

import React, { useEffect, useState } from "react";
import Switcher from "./Switcher";
import Header from "./Header";
import UserCard from "./UserCard";
import { useAuth } from "@/providers/AuthContextProvider";

type UserType = {
  email: string;
  isOnline: boolean;
  phoneNumber: string;
  photoURL: string;
  uid: string;
  displayName: string;
};

const Users = () => {
  const { user } = useAuth() ?? {};
  const [category, setCategory] = useState("all");
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    if (user) {
      const getOtherUsers = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/users/get-users`);
        const data = await response.json();
        const filteredUserList = data.filter((item: UserType) => item.uid !== user.uid && item.uid);
        setUsers(filteredUserList);
      };
      getOtherUsers();
    }
  }, [user]);

  if (users.length === 0) return <span>Loading...</span>;

  return (
    <div className="flex flex-col">
      <Switcher category={category} setCategory={setCategory} />
      <Header />
      <div className="flex flex-col">
        {users.map((user) => (
          <UserCard userId= {user.uid} photoUrl={user.photoURL} username={user.displayName} time="" key={user.uid} />
        ))}
      </div>
    </div>
  );
};

export default Users;
