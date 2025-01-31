import AuthForm from "@/components/ui/forms/AuthForm";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex h-screen bg-default xl:overflow-hidden">
      <div className="bg-[url('/images/login.jpg')] lg:flex min-1050:bg-centered flex-row-reverse bg-[length:1290px_906px] bg-no-repeat min-h-screen hidden w-full h-auto min-1024:bg-center-left  xl:bg-[position:inherit] lg:bg-center xl:bg-contain">
        <div className="bg-default w-[30%] lg:w-[40%]">
        <AuthForm buttonLabel="Sign In" isLogin subtitle="Don't have an account?" subtitleLink="Sign up" title="Sign In to your Account"/>

        </div>
      </div>
      <div className="lg:hidden flex flex-col w-full h-full">
        <img src="/images/login.jpg" alt="" />
        <AuthForm buttonLabel="Sign In" isLogin subtitle="Don't have an account?" subtitleLink="Sign up" title="Sign In to your Account"/>
      </div>
    </div>
  );
};

export default LoginPage;
