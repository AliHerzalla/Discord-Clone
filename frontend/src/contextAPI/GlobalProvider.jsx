import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const globalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [loadingButtonState, setLoadingButtonState] = useState(false);
  return (
    <globalContext.Provider
      value={{ loadingButtonState, setLoadingButtonState }}
    >
      {children}
    </globalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
