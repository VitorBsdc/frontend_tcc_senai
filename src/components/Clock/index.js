import React, { useState } from "react";
import "./style.css";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const getCurrentTime = () => {
    var date = new Date(),
      displayDate;

    displayDate = date.toLocaleTimeString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });

    setCurrentTime(displayDate);
  };
  setInterval(getCurrentTime, 1000);

  const date = new Date();
  const currentDate = date.toLocaleDateString("pt-BR");

  return (
    <div className="box-clock">
      <span className="title-clock">Data / Hora</span>

      <div className="content-clock">
        <span className="clock">{currentTime}</span>

        <span className="date">{currentDate}</span>
      </div>
    </div>
  );
};

export default Clock;
