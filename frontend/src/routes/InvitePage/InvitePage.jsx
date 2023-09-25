import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_BACKEND_URL } from "../../../src/routes/initial-modal/InitialModal";

const InvitePage = () => {
  const { inviteCode } = useParams();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return navigate("/sign-in");
  }

  if (!inviteCode) {
    return navigate("/");
  }

  const findUserInThatServer = async () => {
    const response = await axios.post(
      `${BASE_BACKEND_URL}/find-user-in-that-server/${inviteCode}`,
      {
        data: { userId: user?.id },
      }
    );
    console.log(response?.data);
  };

  findUserInThatServer();

  return null;
};

export default InvitePage;
