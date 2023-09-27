import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_BACKEND_URL } from "../../../src/routes/initial-modal/InitialModal";
import { useEffect } from "react";

const InvitePage = () => {
  const { inviteCode } = useParams();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    navigate("/sign-in");
  }

  // if (!inviteCode) {
  //   navigate("/");
  // }
  useEffect(() => {
    const findUserInThatServer = async () => {
      const response = await axios.post(
        `${BASE_BACKEND_URL}/invite/${inviteCode}`,
        {
          data: { userId: user?.id },
        }
      );
      console.log("invite Link ", response);

    };
    findUserInThatServer();
  }, [inviteCode, user?.id]);

  return <div>...Loading</div>;
};

export default InvitePage;
