import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const globalContext = createContext(false);

const GlobalProvider = ({ children }) => {
  const [loadingButtonState, setLoadingButtonState] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <globalContext.Provider
      value={{
        loadingButtonState,
        setLoadingButtonState,
        isDialogOpen,
        setIsDialogOpen,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
