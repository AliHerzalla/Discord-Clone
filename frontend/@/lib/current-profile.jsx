import { useUser } from "@clerk/clerk-react";
import { useCallback } from "react";

const CurrentProfile = async () => {
  const { user } = useUser();

  const findUniqueProfile = useCallback(async (profileId) => {
    const response = await fetch(
      `${import.meta.env.VITE_MAIN_BACKEND_URL}${
        import.meta.env.VITE_MAIN_BACKEND_PORT
      }/find-unique-profile/${profileId}`,
      {
        method: "GET",
      }
    );
    response.json().then((result) => {
      if (result.data != null) {
        return result?.data;
      }
    });
  }, []);

  if (!user?.id) {
    return null;
  }

  const profile = findUniqueProfile(user?.id);
  return profile;
};

export default CurrentProfile;
