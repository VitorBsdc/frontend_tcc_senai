import React, { useEffect, useState } from "react";
import AlarmeIcon from "../../assets/svgs/alarm-clock.svg";
import "./style.css";

const Alarme = ({ alarmStatus }) => {
	const [alarmOn, alarmOff] = useState(false);

	const handleCheckbox = () => {
		alarmOff(!alarmOn);
	};

	const [time, setTime] = useState(0);

	useEffect(() => {
		let interval = null;

		if (alarmOn) {
			setTime(0);
			interval = setInterval(() => {
				setTime((time) => time + 10);
			}, 10);
		} else {
			clearInterval(interval);
		}
		return () => {
			clearInterval(interval);
		};
	}, [alarmOn]);

	useEffect(() => {
		alarmStatus(alarmOn);
	}, [alarmOn]);

	return (
		<div className="box-alarme">
			<div className="space-alarme-check">
				<span className="title-alarme">Alarme</span>

				<div className="box-switch-alarme">
					<label className="switch-lig-off">
						<input
							type="checkbox"
							checked={alarmOn}
							onChange={handleCheckbox}
						/>
						<span className="slider-lig-off" />
					</label>
				</div>
			</div>

			<div className="box-alarmeIcon-time">
				<img src={AlarmeIcon} alt="relógio do alarme" />

				<span className="time-alarme">
					{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
					{("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
					{("0" + ((time / 10) % 100)).slice(-2)}
				</span>
			</div>
		</div>
	);
};

export default Alarme;
