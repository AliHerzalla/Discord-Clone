import { createContext, useState } from "react";
import PropTypes from "prop-types";
const MainProvider = createContext("");

const MainContextProvider = ({ children }) => {
  const [loadingButtonState, setLoadingButtonState] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenInvite, setIsDialogOpenInvite] = useState(false);
  const [inviteCodeContext, setInviteCodeContext] = useState("");
  return (
    <MainProvider.Provider
      value={{
        loadingButtonState,
        setLoadingButtonState,
        isDialogOpen,
        setIsDialogOpen,
        isDialogOpenInvite,
        setIsDialogOpenInvite,
        inviteCodeContext,
        setInviteCodeContext,
      }}
    >
      {children}
    </MainProvider.Provider>
  );
};

MainContextProvider.propTypes = {
  children: PropTypes.any,
};

export { MainContextProvider, MainProvider };
