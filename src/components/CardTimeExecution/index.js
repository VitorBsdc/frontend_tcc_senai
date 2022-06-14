import React, { useEffect, useState } from "react";
import "./style.css";

const CardTimeExecution = ({ start }) => {
	const [time, setTime] = useState(0);

	useEffect(() => {
		let interval = null;

		if (start) {
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
	}, [start]);

	return (
		<div className="container-execution">
			<h3 className="content-execution h3-execution">Tempo de execução</h3>
			<div className="counter-execution">
				<h1 className="number-execution h1-execution">
					{Math.floor(time / 1000)}
				</h1>
				<h2 className="number-execution h2-execution">seg</h2>
			</div>
		</div>
	);
};

export default CardTimeExecution;
