"use client";
import PersonalForm from "@/components/ui/forms/UserDetailsForm";
import { useAuth } from "@/providers/AuthContextProvider";

const ProfilePage = () => {
  const { user } = useAuth() ?? {};

  if (!user) {
    return <span>Loading....</span>;
  }



  return (
    <div className="flex w-full">
      <img src="/images/profile-page.png" className="lg:h-screen w-full max-w-[50%] object-cover" />
      <div className="flex justify-center items-center w-full max-w-[50%] flex-col gap-10 p-8">
        <h1 className="text-3xl font-medium">Add Personal Details</h1>
        <PersonalForm uid={user.uid} email={user?.email} photoUrl= {user.providerData[0].photoURL}/>
      </div>
    </div>
  );
};

export default ProfilePage;
