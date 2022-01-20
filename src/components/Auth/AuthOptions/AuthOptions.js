import React from "react";
import { Button } from "semantic-ui-react";

import "./AuthOptions.scss";

export default function AuthOptions(props) {
  const { setSelectedForm } = props;
  return (
    <div className="auth-options">
      <h3>Anúnciate gratis en NodePop</h3>
      <Button className="register" onClick={() => setSelectedForm("register")}>
        Regístrate gratis
      </Button>
      <Button className="login" onClick={() => setSelectedForm("login")}>
        Iniciar Sesión
      </Button>
    </div>
  );
}
