import { useUser } from "@clerk/clerk-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InitialModal from "../initial-modal/InitialModal";
import { TailSpin } from "react-loader-spinner";

const BASE_BACKEND_URL = `${import.meta.env.VITE_MAIN_BACKEND_URL}${
  import.meta.env.VITE_MAIN_BACKEND_PORT
}`;

const ProfilePage = () => {
  const { user, isLoaded } = useUser();
  const [userProfile, setUserProfile] = useState(null);

  const navigate = useNavigate();

  // Function to create a new unique profile
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

  // Function to find the profile
  const findProfile = useCallback(
    async (userProfile) => {
      if (!userProfile) return;
      try {
        const { _id } = userProfile;
        const response = await fetch(`${BASE_BACKEND_URL}/get-profile/${_id}`, {
          method: "GET",
        });
        if (!response.ok)
          throw new Error("Couldn't find the server with the specified id.");
        const servers = await response.json();
        console.log("servers => ", servers);
        if (servers?.profileData?.servers.length < 0) {
          return <InitialModal />;
        } else {
          navigate(`/servers/${servers?.profileData?.servers[0]?._id}`);
        }
        // setUserServers(servers?.profileData?.servers);
      } catch (error) {
        console.error("Error fetching profile servers:", error);
      }
    },
    [navigate]
  );
  // Function to find the unique profile

  const findUniqueProfile = useCallback(
    async (profileId) => {
      const response = await fetch(
        `${import.meta.env.VITE_MAIN_BACKEND_URL}${
          import.meta.env.VITE_MAIN_BACKEND_PORT
        }/get-unique-profile/${profileId}`,
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

  // To find the profile user in the database if there is an existing profile we well return the user, if there is no existing profile for this user we well create a new profile

  // Use useEffect to trigger the profile fetching logic

  useEffect(() => {
    if (user?.id) {
      findUniqueProfile(user?.id);
    }
  }, [user?.id, findUniqueProfile, user]);

  useEffect(() => {
    findProfile(userProfile);
  }, [userProfile, findProfile]);

  // Use conditional rendering to handle the case when isLoaded is true and there's no user

  if (isLoaded) {
    if (!user) {
      return navigate("/sign-in");
    }
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
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
    </div>
  );
};

export default ProfilePage;
