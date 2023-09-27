import axios from "axios";
import { BASE_BACKEND_URL } from "../../../src/routes/initial-modal/InitialModal";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import ServerHeader from "./ServerHeader";

const ChannelsNavigationSideBar = () => {
  const [channels, setChannels] = useState([]);
  const [members, setMembers] = useState([]);
  const [serverName, setServerName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [textChannel, setTextChannel] = useState([]);
  const [audioChannel, setAudioChannel] = useState([]);
  const [videoChannel, setVideoChannel] = useState([]);
  const [role, setRole] = useState([]);

  const { serverId } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();

  //To check if the user is in the same server that try to navigate
  const findUniqueServerByServerIdParams = useCallback(async () => {
    try {
      const response = await axios.post(
        `${BASE_BACKEND_URL}/find-unique-server-by-server-id/${serverId}`,
        {
          data: {
            userId: user?.id,
          },
        }
      );
      if (response.status != 200) {
        throw new Error("Something went wrong!");
      } else {
        if (response.data.data != true) {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [serverId, user?.id, navigate]);

  const findServerInfoByServerId = useCallback(async () => {
    try {
      const response = await axios.get(
        `${BASE_BACKEND_URL}/find-server-info/${serverId}`
      );
      if (response.status != 200) {
        throw new Error("Something went wrong!");
      } else {
        if (response.data.data == null) {
          navigate("/");
        } else {
          // console.log(response)
          setMembers(response?.data?.data?.members);
          setChannels(response?.data?.data?.channels);
          setServerName(response?.data?.data?.name);
          setInviteCode(response?.data?.data?.inviteCode);
          if (channels.length > 0) {
            channels?.map((channel) => {
              if (channel.channelType == "TEXT") {
                setTextChannel(channel);
              } else if (channel.channelType == "AUDIO") {
                setAudioChannel(channel);
              } else {
                setVideoChannel(channel);
              }
            });
          }
          if (members.length > 0) {
            members.map((member) => {
              setRole([
                { memberId: member.profileId, memberRole: member.role },
              ]);
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [serverId, navigate]);

  useEffect(() => {
    findUniqueServerByServerIdParams();
    findServerInfoByServerId();
  }, [
    serverId,
    findUniqueServerByServerIdParams,
    findServerInfoByServerId,
    navigate,
  ]);

  return (
    <div
      className={
        "md:ml-[72px] hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0 text-primary dark:bg-[#2B2D31] bg-[#F2F3F5]"
      }
    >
      <ServerHeader
        role={role}
        serverName={serverName}
        serverInviteCode={inviteCode}
        textChannel={textChannel}
        audioChannel={audioChannel}
        videoChannel={videoChannel}
        channels={channels}
        members={members}
      />
    </div>
  );
};

export default ChannelsNavigationSideBar;

{
  /* <div className={"absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"}>
  <TailSpin
    height="32"
    width="32"
    color="white"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
</div>; */
}
