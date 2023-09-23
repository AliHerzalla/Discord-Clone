import { createContext, useState } from "react";
import PropTypes from "prop-types";
const MainProvider = createContext("");

const MainContextProvider = ({ children }) => {
  const [loadingButtonState, setLoadingButtonState] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <MainProvider.Provider
      value={{
        loadingButtonState,
        setLoadingButtonState,
        isDialogOpen,
        setIsDialogOpen,
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
