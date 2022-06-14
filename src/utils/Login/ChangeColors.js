import { useState } from "react";

const ChangeColors = () => {
	const [colorIconEmail, setColorIconEmail] = useState("var(--gray-secondary)");
	const [colorIconLock, setColorIconLock] = useState("var(--gray-secondary)");
	const [borderColorFieldEmail, setBorderColorFieldEmail] = useState(
		"var(--gray-secondary)"
	);
	const [borderColorFieldPassword, setBorderColorFieldPassword] = useState(
		"var(--gray-secondary)"
	);

	const changeIconColor = (focus, icon) => {
		if (icon === "email") {
			setColorIconEmail(() =>
				focus ? "var(--primary)" : "var(--gray-secondary)"
			);
		} else if (icon === "lock") {
			setColorIconLock(() =>
				focus ? "var(--primary)" : "var(--gray-secondary)"
			);
		}
	};
	const changeBorderColor = (focus, field) => {
		if (field === "email") {
			setBorderColorFieldEmail(() =>
				focus ? "var(--primary)" : "var(--gray-secondary)"
			);
		} else if (field === "password") {
			setBorderColorFieldPassword(() =>
				focus ? "var(--primary)" : "var(--gray-secondary)"
			);
		}
	};

	return {
		icons: [colorIconEmail, colorIconLock],
		borders: [borderColorFieldEmail, borderColorFieldPassword],
		changeIconColor,
		changeBorderColor,
	};
};

export default ChangeColors;
