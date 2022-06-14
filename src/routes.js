import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Error from "./pages/Error";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Service from "./services";
const srv = new Service();

const userAuth = srv.validToken;

const PrivateRouteAdmin = ({ children }) => {
  const auth = userAuth(localStorage.getItem("token"), () => {}).then(
    (res) => res
  );
  const userAdm = localStorage.getItem("adm") == 1 ? true : false;

  return auth ? (
    userAdm ? (children) : (
      <Error
        error="Acesso restrito"
        text="Você não tem permissão para acessar esta página."
      />
    )
  ) : (
    <Error error="Acesso restrito" text="Faça login para acessar a página" />
  );
};

const PrivateRouteUser = ({ children }) => {
  const auth = userAuth(localStorage.getItem("token"), () => {}).then(
    (res) => res
  );

  return auth ? (
    children
  ) : (
    <Error error="Acesso restrito" text="Faça login para acessar a página" />
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Error typeError="code" />} />
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRouteUser>
              <Dashboard />
            </PrivateRouteUser>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRouteAdmin>
              <Admin />
            </PrivateRouteAdmin>
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default Router;
