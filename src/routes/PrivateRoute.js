import { Redirect, Route, useLocation } from "react-router";
import { useAuth } from "./context";

const PrivateRoute = (props) => {
  const { isLogged } = useAuth();
  const location = useLocation();

  return isLogged ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: "/auth", state: { from: location } }} />
  );
};

export default PrivateRoute;
