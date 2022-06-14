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
import Service from "../../../services";
import { useState } from "react";
import { toast } from "react-toastify";

const srv = new Service();

export default function EditDialog({ open, onClose, userInfo }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCPF] = useState("");
  const [dataNasc, setDataNasc] = useState("");

  const handleClose = () => {
    onClose();
  };

  async function editUser() {
    const requestingId = localStorage.getItem("idUser");
    const headers = { accessToken: localStorage.getItem("token") };

    await srv
      .editUser(
        requestingId,
        userInfo.idUsuario,
        {
          nome: name === "" ? userInfo.nome : name,
          email: email === "" ? userInfo.email : email,
          CPF: cpf === "" ? userInfo.cpf : cpf,
          ADM: userInfo.accountType === "Administrador" ? true : false,
          DATANASC: dataNasc === "" ? userInfo.DATANASC : dataNasc,
        },
        headers
      )
      .then((res) => {
        toast.info(res.message, { autoClose: 1500 });

        setInterval(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  }

  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf === "") return false;
    if (
      cpf.length !== 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999"
    )
      return false;
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;
    return true;
  }

  function validarDataNasc(evtDate) {
    let date = new Date(evtDate);

    if (date == "Invalid Date") {
      document.querySelector("#date-label").classList.remove("valid");
      document.querySelector("#date-label").classList.add("invalid");

      return;
    }

    const now = new Date();

    if (date.getFullYear() > now.getFullYear()) {
      document.querySelector("#date-label").classList.remove("valid");
      document.querySelector("#date-label").classList.add("invalid");

      toast.error(
        "A data não pode ser maior que hoje, por favor digite uma data válida."
      );

      return false;
    }

    const minDate = new Date(
      now.getFullYear() - 15,
      now.getMonth(),
      now.getDate()
    );

    if (date > minDate) {
      document.querySelector("#date-label").classList.remove("valid");
      document.querySelector("#date-label").classList.add("invalid");

      toast.error("O usuário deve ter mais de 15 anos para ser cadastrado.");

      return;
    }

    document.querySelector("#date-label").classList.remove("invalid");
    document.querySelector("#date-label").classList.add("valid");

    return true;
  }

  return (
    <div>
      <Dialog maxWidth="md" fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>
          <div className="containerTitle">
            <p id="title">Editar usuário</p>
            <Button sx={{ borderRadius: 50 }} onClick={handleClose}>
              <Avatar>
                <CloseRoundedIcon />
              </Avatar>
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="containerForm">
            <div className="containerInputs">
              <div className="areaInput">
                <label id="nome-label">Nome</label>
                <input
                  type="text"
                  defaultValue={userInfo.name}
                  onFocus={() => {
                    document
                      .querySelector("#nome-label")
                      .classList.remove("valid");
                    document
                      .querySelector("#nome-label")
                      .classList.remove("invalid");
                  }}
                  onBlur={(evt) => {
                    evt.target.value = evt.target.value.trim();

                    let isNameValid = !/[^a-zA-Z ]/.test(evt.target.value);

                    if (evt.target.value && !isNameValid) {
                      document
                        .querySelector("#nome-label")
                        .classList.remove("valid");
                      document
                        .querySelector("#nome-label")
                        .classList.add("invalid");

                      toast.error(
                        "Nome Inválido, por favor digite um nome contendo apenas caracteres válido."
                      );

                      evt.target.value = "";
                    } else if (evt.target.value && isNameValid) {
                      document
                        .querySelector("#nome-label")
                        .classList.remove("invalid");
                      document
                        .querySelector("#nome-label")
                        .classList.add("valid");
                      setName(evt.target.value);
                    }
                  }}
                />
              </div>

              <div className="areaInput">
                <label id="cpf-label">CPF</label>
                <input
                  type="text"
                  maxLength="11"
                  defaultValue={userInfo.cpf}
                  onKeyPress={(evt) => {
                    var key = evt.which ? evt.which : evt.keyCode;

                    if (key > 31 && (key < 48 || key > 57)) {
                      evt.preventDefault();
                    }
                  }}
                  onFocus={() => {
                    document
                      .querySelector("#cpf-label")
                      .classList.remove("valid");
                    document
                      .querySelector("#cpf-label")
                      .classList.remove("invalid");
                  }}
                  onBlur={(evt) => {
                    evt.target.value = evt.target.value
                      .replace(
                        /([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/,
                        "$1.$2.$3-$4"
                      )
                      .trim();
                    let isCpfValid = validarCPF(evt.target.value);

                    if (evt.target.value && !isCpfValid) {
                      document
                        .querySelector("#cpf-label")
                        .classList.remove("valid");
                      document
                        .querySelector("#cpf-label")
                        .classList.add("invalid");

                      toast.error(
                        "CPF Inválido, por favor digite um CPF válido."
                      );
                    } else if (evt.target.value && isCpfValid) {
                      document
                        .querySelector("#cpf-label")
                        .classList.remove("invalid");
                      document
                        .querySelector("#cpf-label")
                        .classList.add("valid");
                      setCPF(evt.target.value);
                    }
                  }}
                />
              </div>

              <div className="areaInput">
                <label id="date-label">
                  Data de nascimento (Mês/Dia/AnoCompleto)
                </label>
                <input
                  type="date"
                  format="dd-mm-YYYY"
                  defaultValue={userInfo.birthdayDate}
                  onFocus={() => {
                    document
                      .querySelector("#date-label")
                      .classList.remove("valid");
                    document
                      .querySelector("#date-label")
                      .classList.remove("invalid");
                  }}
                  onBlur={(evt) => {
                    let isDateValid = validarDataNasc(evt.target.value);
                    if (isDateValid === false) evt.target.value = "";
                    if (isDateValid) setDataNasc(evt.target.value);
                  }}
                />
              </div>
            </div>

            <div className="containerInputs">
              <div className="areaInput">
                <label id="email-label">Email</label>
                <input
                  type="email"
                  defaultValue={userInfo.email}
                  onFocus={() => {
                    document
                      .querySelector("#email-label")
                      .classList.remove("valid");
                    document
                      .querySelector("#email-label")
                      .classList.remove("invalid");
                  }}
                  onBlur={(evt) => {
                    evt.target.value = evt.target.value.trim();

                    let isEmailValid =
                      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                        evt.target.value
                      );

                    if (evt.target.value && !isEmailValid) {
                      document
                        .querySelector("#email-label")
                        .classList.remove("valid");
                      document
                        .querySelector("#email-label")
                        .classList.add("invalid");

                      toast.error(
                        "Email Inválido, por favor digite um e-mail válido."
                      );
                    } else if (evt.target.value && isEmailValid) {
                      document
                        .querySelector("#email-label")
                        .classList.remove("invalid");
                      document
                        .querySelector("#email-label")
                        .classList.add("valid");
                      setEmail(evt.target.value);
                    }
                  }}
                />
              </div>

              <div className="areaInput">
                <label>Tipo de conta</label>
                <select
                  defaultValue={userInfo.accountType}
                  onChange={(evt) => {
                    userInfo.accountType = evt.target.value;
                  }}
                >
                  <option>Administrador</option>
                  <option>Comum</option>
                </select>
              </div>
            </div>
          </div>
        </DialogContent>

        <DialogActions
          style={{
            justifyContent: "space-between",
            marginLeft: "3.8em",
            marginBottom: "1em",
          }}
        >
          <Button
            id="confirmEditButton"
            onClick={() => {
              editUser();
              handleClose();
            }}
          >
            Editar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
