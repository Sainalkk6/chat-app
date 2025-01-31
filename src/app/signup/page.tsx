import AuthForm from "@/components/ui/forms/AuthForm";

const SignUpPage = () => {
  return (
    <div className="flex h-screen bg-default xl:overflow-hidden">
      <div className="bg-[url('/images/hero.jpg')] lg:flex min-1050:bg-centered flex-row-reverse bg-[length:1290px_906px] bg-no-repeat min-h-screen hidden w-full h-auto min-1024:bg-center-left  xl:bg-[position:inherit] lg:bg-center xl:bg-contain">
        <div className="bg-default w-[30%] lg:w-[40%]">
          <AuthForm buttonLabel="Next" isLogin={false} subtitle="Already have an account?" subtitleLink="Log in" title="Create an Account" />
        </div>
      </div>
      <div className="lg:hidden flex flex-col w-full h-full">
        <img src="/images/tabletBg.png" alt="" />
        <AuthForm buttonLabel="Next" isLogin={false} subtitle="Already have an account?" subtitleLink="Log in" title="Create an Account" />
      </div>
    </div>
  );
};

export default SignUpPage;
