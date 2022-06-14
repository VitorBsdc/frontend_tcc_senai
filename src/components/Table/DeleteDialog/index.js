import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./style.css";
import { toast } from "react-toastify";
import Service from "../../../services";

const srv = new Service();

export default function DeleteDialog({ open, onClose, userInfo }) {

    const handleClose = () => {
        onClose();
    };

    async function deleteUser() {
        const requestingId = localStorage.getItem("idUser");
        const headers = { "accessToken": localStorage.getItem("token") }

        const response = await srv.deleteUser(requestingId, userInfo.idUsuario, headers);

        toast.info(response.message, { autoClose: 1500 })

        setInterval(() => { 
            window.location.reload()
         }, 2000);
         
        console.log(response);
    }

    return (
        <div>
            <Dialog maxWidth="md" fullWidth={true} open={open} onClose={handleClose}>
                <DialogTitle>
                    <div className="containerTitle">
                        <p id="title">Excluir usuário</p>
                        <Button sx={{ borderRadius: 50 }} onClick={handleClose}>
                            <Avatar>
                                <CloseRoundedIcon />
                            </Avatar>
                        </Button>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <p className="text">Você realmente deseja excluir este usuário?</p>
                </DialogContent>

                <DialogActions
                    style={{
                        marginRight: "1em",
                        marginBottom: "1em",
                    }}
                >
                    <Button id="cancelDeleteButton" onClick={handleClose}>Cancelar</Button>
                    <Button id="confirmDeleteButton" onClick={() => {
                        deleteUser()
                        handleClose()
                    }}>Confirmar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
