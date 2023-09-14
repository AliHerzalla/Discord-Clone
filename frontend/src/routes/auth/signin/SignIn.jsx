import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => (
  <div className={"flex h-[100vh] w-full justify-center items-center"}>
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up"/>
  </div>
);
export default SignInPage;
