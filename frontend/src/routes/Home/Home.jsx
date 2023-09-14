// import { UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
// import { ModeToggle } from "../../../@/components/ui/mode-toggle";
import { useEffect } from "react";
const Home = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const findUser = async (userId) => {
    const response = await fetch(
      `${
        import.meta.env.VITE_MAIN_BACKEND_URL +
        import.meta.env.VITE_MAIN_BACKEND_PORT
      }/get-signed-user/${userId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await response.json();
    console.log("test");
    return result;
  };

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return <div>Loading...</div>;
    } else if (user) {
      // If there is a user try'es to sign in should be find in the DB first if not found crate a new user

      // const userInformation = {
      //   username: `${user.firstName} ${user.lastName}`,
      //   userId: user.id,
      //   imageUrl: user.imageUrl,
      //   email: user.emailAddresses[0].emailAddress,
      // };

      if (findUser(user?.id)) {
        console.log("done");
      } else {
        console.log("error");
        //createUser();
      }
    } else {
      return new Error("Something went wrong! Please try again later.");
    }
  }, [
    isLoaded,
    isSignedIn,
    user,
    user.emailAddresses,
    user.firstName,
    user.id,
    user.imageUrl,
    user.lastName,
  ]);
};

// return (
//   <>
//     <div className="dark:bg-[#313338]">
//       <h1 className="text-5xl text-green-600">This is a protected Route</h1>
//       <div className="bg-gray-500 flex gap-5 text-white h-12 justify-center items-center">
//         <h3>Hello {user.fullName}!</h3>
//         <UserButton
//           /*userProfileMode="navigation"*/ afterSignOutUrl={"/sign-in"}
//         />
//         <ModeToggle />
//       </div>
//     </div>
//   </>
// );

export default Home;
