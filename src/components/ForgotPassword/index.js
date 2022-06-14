import { Dialog, Slide, DialogContent } from "@mui/material";
import React, { forwardRef, useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Transition = forwardRef((props, ref) => {
	return <Slide direction="down" ref={ref} {...props} />;
});

const ForgotPassword = () => {
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<button type="button" className="false-link" onClick={handleClickOpen}>
				Esqueci minha senha
			</button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
				sx={{
					position: "absolute",
					bottom: "70%",
					height: "min-content",
					overflow: "hidden",
				}}
			>
				<div className="alert-password">
					<div className="title">
						<ErrorOutlineIcon
							color="error"
							sx={{ marginRight: 1, fontSize: 36 }}
						/>
						<h4>Esqueceu a senha?</h4>
					</div>
					<DialogContent>
						<div className="dialog-content-text">
							Contate um administrador para recuperar sua senha.
						</div>
					</DialogContent>
					<div className="dialog-btn-confirm">
						<button onClick={handleClose}>Entendi</button>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default ForgotPassword;
