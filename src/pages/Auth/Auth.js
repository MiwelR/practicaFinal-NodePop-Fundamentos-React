import React, { useState } from "react";
// import { BrowserRouter as Router, Switch } from "react-router-dom";
import AuthOptions from "../../components/Auth/AuthOptions";
// import { useAuth } from "../../routes/context";
import RegisterForm from "../../components/Auth/RegisterForm";
import LoginForm from "../../components/Auth/LoginForm";
import Logo from "../../assets/nodepop-logo.png";

import "./Auth.scss";

export default function Auth({ ...props }) {
  // const { handleLogin } = useAuth();
  const [selectedForm, setSelectedForm] = useState(null);

  // const handleSubmit = (credentials) => {
  //   execute(credentials)
  //     .then(handleLogin)
  //     .then(() => {
  //       const { from } = location.state || { from: { pathname: "/" } };
  //       history.replace(from);
  //     });
  // };

  // const redirectProps = () => {
  //   const { from } = location.state || { from: { pathname: "/" } };
  //   console.log(from);
  //   return history.replace(from);
  // };

  const handlerForm = () => {
    switch (selectedForm) {
      case "login":
        return <LoginForm setSelectedForm={setSelectedForm} {...props} />;
      case "register":
        return <RegisterForm setSelectedForm={setSelectedForm} />;
      default:
        return <AuthOptions setSelectedForm={setSelectedForm} />;
    }
  };

  return (
    <div className="auth">
      <div className="auth__dark"></div>
      <div className="auth__box">
        <div className="auth__box-logo">
          <img src={Logo} alt="NodePop" />
        </div>
        {handlerForm()}
      </div>
    </div>
  );
}
