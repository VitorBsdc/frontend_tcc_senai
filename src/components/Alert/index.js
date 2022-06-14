import { Dialog, Slide, DialogContent } from "@mui/material";
import React, { forwardRef } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Alert = (props) => {
  const { open, setOpen, title, description } = props;
  const handleClose = () => setOpen(false);

  return (
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
          <h4>{title || "Ops..."}</h4>
        </div>
        <DialogContent>
          <div className="dialog-content-text">
            {description ||
              "Houve um erro inesperado, tente novamente mais tarde."}
          </div>
        </DialogContent>
        <div className="dialog-btn-confirm">
          <button onClick={handleClose}>Entendi</button>
        </div>
      </div>
    </Dialog>
  );
};

export default Alert;
