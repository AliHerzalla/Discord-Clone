import { SignIn } from "@clerk/react";

const SignInPage = () => (
  <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
);
export default SignInPage;
