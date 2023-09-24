import { UserButton, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_BACKEND_URL } from "../../../src/routes/initial-modal/InitialModal";
import { useCallback, useEffect, useState } from "react";
import NavigationAction from "./NavigationAction";
import { Separator } from "../../../components/ui/separator";
import { ScrollArea } from "../../../components/ui/scroll-area";
import NavigationItem from "./NavigationItem";
import { ModeToggle } from "../mode-toggle";
import PropTypes from "prop-types";

const NavigationSideBar = ({ onServerCreation }) => {
  const { isSignedIn, user } = useUser();
  const [userServers, setUserServers] = useState([]);
  const navigate = useNavigate();

  const findServerByUserId = useCallback(async () => {
    // Get Members
    const response = await axios.get(
      `${BASE_BACKEND_URL}/find-server-by-userId/${user?.id}`
    );
    if (response.status != 200) {
      throw new Error("Couldn't find the servers");
    } else {
      setUserServers(response?.data?.data[0]?.servers);
    }
  }, [user?.id]);

  useEffect(() => {
    findServerByUserId();
  }, [findServerByUserId, onServerCreation]);

  useEffect(() => {
    if (!isSignedIn) {
      return navigate("/sign-in");
    }
  }, [navigate, isSignedIn]);

  return (
    <div
      className={
        "space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3"
      }
    >
      <NavigationAction />
      <Separator
        className={
          "h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
        }
      />
      <ScrollArea className={"flex-1 w-full"}>
        {userServers?.length > 0 &&
          userServers?.map((server) => {
            return (
              <div key={server._id} className={"mb-4"}>
                <NavigationItem
                  id={server._id}
                  imageUrl={`${BASE_BACKEND_URL}/${server.imageUrl}`}
                  name={server.name}
                />
              </div>
            );
          })}
      </ScrollArea>
      <Separator
        className={
          "h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
        }
      />
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/sign-in"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavigationSideBar;
NavigationSideBar.propTypes = {
  onServerCreation: PropTypes.func,
};
