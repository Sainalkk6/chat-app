import Aside from "@/components/Aside";
import Chatroom from "@/components/chatroom";
import React from "react";

const Home = () => {
  return (
    <div className="flex w-full gap-6 bg-[#f9f8fd] min-h-screen">
      <Aside />
      <Chatroom />
    </div>
  );
};

export default Home;
