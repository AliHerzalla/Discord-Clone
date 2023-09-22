import PropTypes from "prop-types";
import NavigationSideBar from "../../../@/components/navigation/navigation-sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className={"h-screen dark:bg-[#313338]"}>
      <div
        className={
          "hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0"
        }
      >
        <NavigationSideBar />
      </div>
      <main className={"md:pl-[72px] h-full"}>{children}</main>
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.any,
};
