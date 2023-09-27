import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_BACKEND_URL } from "../../../src/routes/initial-modal/InitialModal";
import { useCallback, useEffect } from "react";

const InvitePage = () => {
  const { inviteCode } = useParams();
  const navigate = useNavigate();
  const { isSignedIn, user, isLoaded } = useUser();

  const findUserInThatServer = useCallback(async () => {
    const response = await axios.post(
      `${BASE_BACKEND_URL}/find-user-in-that-server/${inviteCode}`,
      {
        data: { userId: user?.id },
      }
    );
    if (response?.data?.navigate) {
      navigate(`/servers/${response?.data?.serverId}`);
    }
  }, [inviteCode, user?.id, navigate]);

  useEffect(() => {
    if (isLoaded) {
      findUserInThatServer();
    }
    if (!isSignedIn) {
      navigate("/sign-in");
    }
    if (!inviteCode) {
      navigate("/");
    }
  }, [findUserInThatServer, isLoaded]);

  return null;
};

export default InvitePage;
