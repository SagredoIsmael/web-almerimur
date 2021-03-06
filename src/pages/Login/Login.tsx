import React, { useState } from "react";
import { useHistory } from "react-router";
import { loginAdmin } from "src/api/user.api";
import { Input, Loader, Alert } from "src/components";
import "./Login.css";

export interface LoginValues {
  username: string;
  password: string;
}

function Login() {
  const [values, setValues] = useState<LoginValues>({
    username: "",
    password: "",
  });

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "" });

  const enableLoader = () => setIsLoading(true);
  const disableLoader = () => setIsLoading(false);

  const handleCloseAlert = () => setAlert({ ...alert, show: false });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    enableLoader();
    const response = await loginAdmin(values);
    if (response.error && response.message) {
      setAlert({ show: true, message: response.message });
      disableLoader();
      return;
    }
    const { data } = response;
    if (data) localStorage.setItem("token", data.token);
    history.push("/create/user");
  };

  const token = localStorage.getItem("token");
  if (token) {
    history.push("/");
    return null;
  }

  return (
    <div className="login_container">
      {isLoading && <Loader />}
      <Alert
        show={alert.show}
        message={alert.message}
        onClose={handleCloseAlert}
      />
      <div className="login_logo">
        <img src="/img/logo@2x.png" alt="logo" />
      </div>
      <form className="login_form" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          onChange={handleInputChange}
          className="mb-4"
        />
        <Input
          type="password"
          name="password"
          placeholder="Contrase??a"
          onChange={handleInputChange}
          className="mb-4"
        />
        <button className="button">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
