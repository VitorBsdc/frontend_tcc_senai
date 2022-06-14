import React, { useEffect } from "react";
import CustomTable from "../../components/Table/index";
import Header from "../../components/Header";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Service from "../../services";

const srv = new Service();

const Admin = () => {

  const navigate = useNavigate();

  useEffect(() => {
    srv.validToken(localStorage.getItem("token"), () => {
      navigate("/")
    })
  }, [])

  return (
    <div>
      <Header titleHeader="Gerenciamento" userName={localStorage.getItem("user")}/>

      <div className="containerTable">
        <div
          style={{
            width: "90%",
            margin: 50,
          }}
        >
          <CustomTable rowsNumber={7} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
