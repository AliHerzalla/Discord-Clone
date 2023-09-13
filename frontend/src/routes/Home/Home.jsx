import { UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { ModeToggle } from "../../../@/components/ui/mode-toggle";
const Home = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  console.log(useUser());
  if (!isLoaded) {
    return null;
  }
  if (isSignedIn) {
    return (
      <>
        <div className="dark:bg-[#313338]">
          <h1 className="text-5xl text-green-600">This is a protected Route</h1>
          <div className="bg-gray-500 flex gap-5 text-white h-12 justify-center items-center">
            <h3>Hello {user.fullName}!</h3>
            <UserButton
              /*userProfileMode="navigation"*/ afterSignOutUrl={"/sign-in"}
            />
            <ModeToggle />
          </div>
        </div>
      </>
    );
  }
  return <div>Not signed in</div>;
};

export default Home;
