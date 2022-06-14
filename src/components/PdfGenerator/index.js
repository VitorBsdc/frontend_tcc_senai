import React, { useState } from "react";
import "./style.css";
import Service from "../../services";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import LgSenai from "../../assets/images/senai.png";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const srv = new Service();

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

const PdfGenerator = () => {
	const [rotation, setRotation] = useState(async () => { srv.pdfInfo().then((res) => res.rotation).then((ress) => setRotation(ress)) });
	const [velocity, setVelocity] = useState(async () => { srv.pdfInfo().then((res) => res.velocity).then((ress) => setVelocity(ress)) });
	const [temperature, setTemperature] = useState(async () => { srv.pdfInfo().then((res) => res.temperature).then((ress) => setTemperature(ress)) });


	const create = () => {
		pdfMake.createPdf(docDefinition).open({}, window.open("", "_blank"));
	};

	var docDefinition = {
		pageSize: "A4",
		pageMargins: [40, 60, 40, 60],
		pages: 2,

		footer: [
			{
				text: `Exportado em ${today.toLocaleDateString()}`,
				alignment: "right",
				margin: [0, 0, 16, 0],
				style: "footer",
				color: "#000",
			},

			{
				text: "Escola Senai Suíço-Brasileira Paulo Ernesto Tolle - 2022",
				alignment: "center",
				style: "footer",
				margin: [0, 12, 0, 0],
			},
		],

		content: [
			{
				image: LgSenai,
				alignment: "center",
				margin: [0, 10],
			},

			{
				text: "Relatório máquina - CNC SR-20J Type C",
				margin: [5, 26],
				alignment: "center",
				style: "headerTitle",
			},

			{
				text: `Velocidade de avanço médio: ${velocity}`,
				margin: [60, 26],
				style: "infosMachine",
				alignment: "left",
			},

			{
				text: `Temperatura média: ${temperature}`,
				margin: [60, 26],
				style: "infosMachine",
				alignment: "left",
			},

			{
				text: `Rotação por minuto média: ${rotation}`,
				margin: [60, 26],
				style: "infosMachine",
				alignment: "left",
			},
		],

		styles: {
			headerTitle: {
				fontSize: 20,
				bold: true,
			},

			infosMachine: {
				fontSize: 14,
				bold: false,
				italics: true,
			},

			footer: {
				color: "#535659",
				fontSize: 12,
			},
		},
	};

	return (
		<button className="btn-pdfGenerator" type="button" onClick={create}>
			Relatório em PDF
		</button>
	);
};

export default PdfGenerator;
