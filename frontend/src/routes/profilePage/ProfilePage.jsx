import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InitialModal from "../initial-modal/InitialModal";

const BASE_BACKEND_URL = `${import.meta.env.VITE_MAIN_BACKEND_URL}${
  import.meta.env.VITE_MAIN_BACKEND_PORT
}`;

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
        `${BASE_BACKEND_URL}/create-unique-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileDate),
        }
      );
      if (!response.ok)
        throw new Error("there was an error creating the profile");
      const result = await response.json();
      setUserProfile(result.data);
    } catch (error) {
      console.log("client error createNewUniqueProfile", error);
      console.error("Error creating/fetching profile:", error);
    }
  };

  const findProfileServers = async (userProfile) => {
    if (!userProfile) return;
    try {
      const { _id } = userProfile;
      console.log("_ID" , _id)
      const response = await fetch(
        `${BASE_BACKEND_URL}/get-profile-servers/${_id}`,
        {
          method: "GET",
        }
      );
      if (!response.ok)
        throw new Error("Couldn't find the server with the specified id.");
      const servers = await response.json();
      setUserServers(servers);
    } catch (error) {
      console.error("Error fetching profile servers:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    const findUniqueProfile = async () => {
      try {
        const response = await fetch(
          `${BASE_BACKEND_URL}/get-unique-profile/${user.id}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) throw new Error("Error fetching unique profile");

        const result = await response.json();

        if (result.data == null) {
          createNewUniqueProfile(user);
        } else {
          setUserProfile(result.data);
        }
      } catch (error) {
        console.error("Error fetching unique profile:", error);
      }
    };
    findUniqueProfile();
  }, [user]);

  // To find the profile user in the database if there is an existing profile we well return the user, if there is no existing profile for this user we well create a new profile

  // useEffect(() => {
  //   findUniqueProfile(user?.id);
  // }, [user?.id, findUniqueProfile]);

  useEffect(() => {
    findProfileServers(userProfile);
  }, [userProfile]);

  if (!user) {
    return RedirectToSignIn();
  }

  if (userProfile) {
    // findProfileServers(userProfile);
    if (userServers.length > 0) {
      return navigate(`/servers/${userServers.id}`);
    } else {
      return <InitialModal />;
    }
  }
};

export default ProfilePage;

//  const findUniqueProfile = useCallback(
//    async (profileId) => {
//      const response = await fetch(
//        `${BASE_BACKEND_URL}/get-unique-profile/${profileId}`,
//        {
//          method: "GET",
//        }
//      );
//      response.json().then((result) => {
//        if (result.data == null) {
//          createNewUniqueProfile(user);
//        } else {
//          setUserProfile(result.data);
//        }
//      });
//    },
//    [user]
//  );
