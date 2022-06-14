import React, { useState, useCallback, useEffect } from "react";
import Header from "../../components/Header";
import CardLigDesl from "../../components/CardLigDesl";
import CardTimeExecution from "../../components/CardTimeExecution";
import Alarme from "../../components/Alarme";
import Clock from "../../components/Clock";
import ChartFeedRate from "../../components/ChartFeedRate";
import ChartTemperature from "../../components/ChartTemperature";
import ChartArea from "../../components/ChartArea";
import "./style.css";
import "./responsive.css";
import { useNavigate } from "react-router-dom";

import Service from "../../services";
const srv = new Service();

const Dashboard = () => {
	const navigate = useNavigate();

	const [user, setUser] = useState(null);

	const verifyUser = useCallback(async () => {
		const { user: username, token } = localStorage;

		if (!token) navigate("/");
		else {
			const valid = srv.validToken(token, () => {
				localStorage.clear();
				navigate("/");
			});

			if (valid) setUser(username);
		}
	}, [navigate]);

	useEffect(() => {
		verifyUser();
	}, [verifyUser]);

	const [statusMachine, setStatusMachine] = useState("");
	const getStatusMachine = (status) => {
		setStatusMachine(status);
	};

	const [alarmStatus, setAlarmStatus] = useState("");
	const getAlarmStatus = (status) => {
		setAlarmStatus(status);
	};

	return (
		<>
			<Header titleHeader="Dashboard" userName={user} />

			<article className="dashboard">
				<section className="container-cards-dash">
					<div className="box-card status">
						<CardLigDesl
							statusMachine={getStatusMachine}
							stopMachine={alarmStatus}
						/>
					</div>

					<div className="box-card execution">
						<CardTimeExecution start={statusMachine} />
					</div>

					<div className="box-card alarme">
						<Alarme alarmStatus={getAlarmStatus} />
					</div>

					<div className="box-card clock">
						<Clock />
					</div>

					<div className="box-chart feedChart-cards">
						<ChartFeedRate />
					</div>
				</section>

				<section className="container-charts-dash">
					<div className="box-chart feedChart">
						<ChartFeedRate statusMachine={statusMachine} />
					</div>

					<div className="two-charts">
						<div className="box-chart temperature">
							<ChartTemperature statusMachine={statusMachine} />
						</div>

						<div className="box-chart rotationMin">
							<ChartArea statusMachine={statusMachine} />
						</div>
					</div>
				</section>
			</article>
		</>
	);
};
export default Dashboard;
