import React, { useEffect, useState } from "react";
import Service from "../../services";
import "./style.css";

const srv = new Service();

const CardLigDesl = ({ statusMachine, stopMachine }) => {
	const [isChecked, setIsChecked] = useState(false);

	const handleCheckbox = () => {
		setIsChecked(!isChecked);
		srv.statusMachine(isChecked ? 0 : 1);
	};

	useEffect(() => {
		if (!isChecked) {
			srv.statusMachine(0);
		}

		statusMachine(isChecked);
	}, [isChecked]);

	useEffect(() => {
		if (stopMachine) {
			setIsChecked(false);
		}
	}, [stopMachine]);

	return (
		<div className="container-lig-off">
			<h3 className="content-lig-off">Desligado / Ligado</h3>

			<div className="box-switch-lig-off">
				<label className="switch-lig-off">
					<input
						type="checkbox"
						disabled={stopMachine}
						checked={isChecked}
						onChange={handleCheckbox}
					/>
					<span className="slider-lig-off" />
				</label>
			</div>
		</div>
	);
};

export default CardLigDesl;
