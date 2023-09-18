import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InitialModal from "../initial-modal/InitialModal";

const ProfilePage = () => {
  const { user } = useUser();
  const [userProfile, setUserProfile] = useState(null);
  const [userServers, setUserServers] = useState([]);

  const navigate = useNavigate();

  const createNewUniqueProfile = async (user) => {
    try {
      const profileDate = {
        userId: user?.id,
        username: `${user?.firstName} ${user?.lastName}`,
        imageUrl: user?.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      };

      const response = await fetch(
        `${import.meta.env.VITE_MAIN_BACKEND_URL}${
          import.meta.env.VITE_MAIN_BACKEND_PORT
        }/create-unique-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileDate),
        }
      );
      const result = await response.json();
      if (result) {
        setUserProfile(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const findUniqueProfile = useCallback(
    async (profileId) => {
      const response = await fetch(
        `${import.meta.env.VITE_MAIN_BACKEND_URL}${
          import.meta.env.VITE_MAIN_BACKEND_PORT
        }/find-unique-profile/${profileId}`,
        {
          method: "GET",
        }
      );
      response.json().then((result) => {
        if (result.data == null) {
          createNewUniqueProfile(user);
        } else {
          setUserProfile(result.data);
        }
      });
    },
    [user]
  );

  const findProfileServers = async (userProfile) => {
    const { _id } = userProfile;
    const response = await fetch(
      `${import.meta.env.VITE_MAIN_BACKEND_URL}${
        import.meta.env.VITE_MAIN_BACKEND_PORT
      }/find-profile-servers/${_id}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      response.json().then((servers) => {
        setUserServers(servers);
      });
    }
  };

  // To find the profile user in the database if there is an existing profile we well return the user, if there is no existing profile for this user we well create a new profile

  useEffect(() => {
    findUniqueProfile(user?.id);
  }, [user?.id, findUniqueProfile]);

  if (!user) {
    return RedirectToSignIn();
  }

  if (userProfile) {
    findProfileServers(userProfile);
    if (userServers.length > 0) {
      console.log(userServers);
      return navigate(`/servers/${userServers.id}`);
    } else {
      return <InitialModal />;
    }
  }
};

export default ProfilePage;
