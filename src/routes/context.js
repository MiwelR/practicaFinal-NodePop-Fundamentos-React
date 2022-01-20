import React, { useContext } from "react";
import T from "prop-types";

const AuthContext = React.createContext();

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export const AuthContextProvider = ({ children, ...props }) => (
  <AuthContext.Provider value={props}>{children}</AuthContext.Provider>
);
export const AuthContextConsumer = AuthContext.Consumer;

AuthContextProvider.propTypes = {
  children: T.node,
};

AuthContextProvider.defaultProps = {
  children: null,
};

export default AuthContext;
