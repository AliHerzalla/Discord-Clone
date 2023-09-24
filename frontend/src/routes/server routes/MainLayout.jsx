import PropTypes from "prop-types";
import NavigationSideBar from "../../../@/components/navigation/navigation-sidebar";
import CreateNewServerModal from "../../../src/routes/initial-modal/CreateNewServerModal";
import { MainProvider } from "../../../src/contextAPI/MainContextProvider";
import { useContext, useState } from "react";

const MainLayout = ({ children }) => {
  const { isDialogOpen } = useContext(MainProvider);
  // State to track the number of servers
  const [serverCount, setServerCount] = useState(0);

  // Callback function to update server count
  const handleServerCreation = () => {
    setServerCount((prevCount) => prevCount + 1);
  };
  return (
    <div className={"h-screen dark:bg-[#313338]"}>
      {isDialogOpen ? <CreateNewServerModal /> : ""}
      <div
        className={
          "hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0"
        }
      >
        <NavigationSideBar onServerCreation={handleServerCreation} />
      </div>
      <main className={"md:pl-[72px] h-full"}>{children}</main>
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.any,
};
