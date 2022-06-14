import React, { useEffect, useState } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

import ChangeColors from "../../utils/Login/ChangeColors";
import LogoSenai from "../../assets/svgs/LogoSenai.svg";
import "./style.css";
import ForgotPassword from "../../components/ForgotPassword";

import Alert from "../../components/Alert";

import Service from "../../services";
const srv = new Service();

const Login = () => {
  const changeColors = ChangeColors();
  const navigate = useNavigate();

  const {
    icons: [colorIconEmail, colorIconLock],
  } = changeColors;
  const {
    borders: [borderColorFieldEmail, borderColorFieldPassword],
  } = changeColors;
  const { changeBorderColor, changeIconColor } = changeColors;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const login = async () => {
    try {
      const body = {
        email: email.trim(),
        senha: password.trim(),
      };
      const response = await srv.login(body);

      if (!response.error) {
        localStorage.setItem("adm", response.ADM);
        localStorage.setItem("user", response.nome);
        localStorage.setItem("token", response.token);
        localStorage.setItem("idUser", response.idUsuario);

        navigate("/dashboard");
      } else {
        setTitle("Não foi possível fazer o login");
        setDescription(
          "Verifique suas credências e tente novamente, por favor!"
        );

        setOpen(true);
      }
    } catch (err) {
      setTitle("Não foi possível fazer o login");
      setDescription("Verifique suas credências e tente novamente, por favor!");

      setOpen(true);
    }
  };

  useEffect(() => {
    srv
      .validToken(localStorage.getItem("token"), () => {})
      .then((res) => {
        if (res) navigate("/dashboard");
      });
  }, []);

  return (
    <main className="login">
      <Alert
        open={open}
        setOpen={setOpen}
        title={title}
        description={description}
      />

      <section className="bg-image"></section>

      <section className="container-form">
        <div className="box-content">
          <div className="content">
            <div className="box-logo">
              <img
                src={LogoSenai}
                alt="Logo Senai Vermelho"
                className="logo-senai"
              />
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                login();
              }}
            >
              <div className="title">
                <h1>Fazer login</h1>
              </div>

              <div className="fields">
                <div
                  className="field"
                  style={{ borderColor: borderColorFieldEmail }}
                >
                  <EmailOutlinedIcon
                    className="icon-field"
                    style={{ color: colorIconEmail }}
                  />
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    placeholder="Email"
                    required
                    onFocus={() => {
                      changeBorderColor(true, "email");
                      changeIconColor(true, "email");
                    }}
                    onBlur={() => {
                      changeBorderColor(false, "email");
                      changeIconColor(false, "email");
                    }}
                  />
                </div>

                <div
                  className="field"
                  style={{ borderColor: borderColorFieldPassword }}
                >
                  <LockOutlinedIcon
                    className="icon-field"
                    style={{ color: colorIconLock }}
                  />
                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    placeholder="Senha"
                    required
                    onFocus={() => {
                      changeBorderColor(true, "password");
                      changeIconColor(true, "lock");
                    }}
                    onBlur={() => {
                      changeBorderColor(false, "password");
                      changeIconColor(false, "lock");
                    }}
                  />
                </div>
              </div>

              <div className="box-link">
                <ForgotPassword />
              </div>

              <button type="submit" className="btn">
                Entrar
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
