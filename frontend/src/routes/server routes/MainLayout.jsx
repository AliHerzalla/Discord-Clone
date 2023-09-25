import PropTypes from "prop-types";
import NavigationSideBar from "../../../@/components/navigation/navigation-sidebar";
import CreateNewServerModal from "../../../src/routes/initial-modal/CreateNewServerModal";
import { MainProvider } from "../../../src/contextAPI/MainContextProvider";
import { useContext, useState } from "react";
import ChannelsNavigationSideBar from "../../../@/components/navigation/ChannelsNavigationSideBar";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import InviteModal from "../initial-modal/InviteModal";

const MainLayout = ({ children }) => {
  const { isDialogOpen, isDialogOpenInvite } = useContext(MainProvider);
  // State to track the number of servers
  const [serverCount, setServerCount] = useState(0);
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  if (!isSignedIn) {
    return navigate("/sign-in");
  }

  // Callback function to update server count
  const handleServerCreation = () => {
    setServerCount((prevCount) => prevCount + 1);
  };

  return (
    <div className={"h-screen dark:bg-[#313338] flex"}>
      {isDialogOpen ? <CreateNewServerModal /> : ""}
      {isDialogOpenInvite ? <InviteModal /> : ""}
      <div
        className={
          "hidden md:flex h-full w-[72px] z-30 flex-row fixed inset-y-0"
        }
      >
        <NavigationSideBar onServerCreation={handleServerCreation} />
      </div>
      <ChannelsNavigationSideBar />
      <main className={"md:pl-[340px] h-full"}>{children}</main>
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.any,
};
