import React, { useState } from "react";
import T from "prop-types";
// import { useHistory, useLocation, Redirect } from "react-router-dom";
import { Button, Icon, Form, Input, Checkbox } from "semantic-ui-react";
import { validateEmail } from "../../../utils/Validations";
import { login, loginSave } from "../../../api/service";
import { AuthContextConsumer } from "../../../routes/context";

import "./LoginForm.scss";

function LoginForm(onLogin, ...props) {
  // const { setSelectedForm } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValueForm());
  const [rememberLogin, setRememberLogin] = useState(false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeCheckbox = (ev, data) => {
    setRememberLogin(data.checked);
  };

  // function redirect() {
  //   const { from } = location.state || { from: { pathname: "/" } };
  //   console.log(from);
  //   return history.replace(from);
  // }

  const onSubmit = async (event) => {
    event.preventDefault();

    setFormError({});
    let errors = {};
    let formOk = {};

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }

    if (formData.password.length < 8) {
      errors.password = true;
      formOk = false;
    }
    setFormError(errors);

    if (formOk) {
      setIsLoading(true);

      try {
        if (rememberLogin) {
          await loginSave(formData);
        } else {
          await login(formData);
        }
        setIsLoading(false);
        console.log(onLogin.onLogin);
        onLogin.onLogin();
        // redirect();
      } catch (formError) {
        setFormError(formError);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="login-form">
      <h1>Crea tus anuncios</h1>

      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electrónico"
            icon="mail outline"
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">
              Por favor, introduce un correo electrónico válido.
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            error={formError.password}
            icon={
              showPassword ? (
                <Icon
                  name="eye slash outline"
                  link
                  onClick={handlerShowPassword}
                />
              ) : (
                <Icon name="eye" link onClick={handlerShowPassword} />
              )
            }
          />
          {formError.password && (
            <span className="error-text">
              Por favor, introduce una contraseña correcta.
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Checkbox
            toggle
            name="remember"
            label="Recordar contraseña"
            onChange={(ev, data) => onChangeCheckbox(ev, data)}
          />
        </Form.Field>
        <Button type="submit" loading={isLoading}>
          Iniciar Sesión
        </Button>
      </Form>

      {/* <div className="login-form__options">
        <p
          onClick={() => {
            setSelectedForm(null);
          }}
        >
          Volver
        </p>
        <p>
          ¿No tienes cuenta?{" "}
          <span onClick={() => setSelectedForm("register")}>Regístrate</span>
        </p>
      </div> */}
    </div>
  );
}

function defaultValueForm() {
  return {
    email: "",
    password: "",
  };
}

LoginForm.propTypes = {
  onLogin: T.func.isRequired,
};

const ConnectedLoginPage = (props) => (
  <AuthContextConsumer>
    {(auth) => <LoginForm onLogin={auth.handleLogin} {...props} />}
  </AuthContextConsumer>
);

export default ConnectedLoginPage;
