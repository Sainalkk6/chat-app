"use client";

import { httpClient } from "@/lib/client";
import { useAuth } from "@/providers/AuthContextProvider";
import { useEffect, useState } from "react";
import Header from "./Header";
import Switcher from "./Switcher";
import UserCard from "./UserCard";
import { Endpoints } from "@/utils/enpoints";

type UserType = {
  email: string;
  isOnline: boolean;
  phoneNumber: string;
  photoURL: string;
  uid: string;
  displayName: string;
  lastMessage: string;
  timestamp: string;
};

const Users = () => {
  const { user } = useAuth() ?? {};
  const [category, setCategory] = useState("all");
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    if (user) {
      const getOtherUsers = async () => {
        const client = await httpClient();
        const getUsers = await client.get(Endpoints.getUsers(user.uid));
        const data = getUsers.data;
        setUsers(data);
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
          <UserCard userId={user.uid} photoUrl={user.photoURL} username={user.displayName} timestamp={user.timestamp} lastMessage={user.lastMessage} key={user.uid} />
        ))}
      </div>
    </div>
  );
};

export default Users;
