import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState } from "react";
import { logout } from "./api/service";
import { AuthContextProvider } from "./routes/context";
import PrivateRoute from "./routes/PrivateRoute";

import Auth from "./pages/Auth";
import AdvertsPage from "./pages/AdvertsPage";
import AdvertDetailsPage from "./pages/AdvertDetailsPage";
import NewAdvertPage from "./pages/NewAdvertPage";

import "./App.scss";

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    logout().then(() => setIsLogged(false));
  };

  const authProps = { isLogged, handleLogin, handleLogout };

  return (
    <Router>
      <AuthContextProvider {...authProps}>
        <div className="App">
          <Switch>
            <PrivateRoute exact path="/adverts/new">
              <NewAdvertPage />
            </PrivateRoute>
            <PrivateRoute path="/adverts/:advertId">
              {(routeProps) => <AdvertDetailsPage {...routeProps} />}
            </PrivateRoute>
            <PrivateRoute exact path="/adverts">
              <AdvertsPage />
            </PrivateRoute>
            <Route exact path="/auth">
              {isLogged ? <Redirect to="/adverts" /> : <Auth />}
            </Route>
            <Route exact path="/">
              {isLogged ? <Redirect to="/adverts" /> : <Redirect to="/auth" />}
            </Route>
            <Route exact path="/404">
              <div>404 | Not Found Page</div>
            </Route>
            <Route>
              <Redirect to="/404" />
            </Route>
          </Switch>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
