import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => (
  <div className={"flex h-[100vh] w-full justify-center items-center"}>
    <SignUp routing="path" path="/sign-up" signInUrl={"/sign-in"} />
  </div>
);

export default SignUpPage;
