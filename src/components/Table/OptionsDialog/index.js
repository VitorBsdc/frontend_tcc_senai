import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import IconButton from "@mui/material/IconButton";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import "./style.css"
import EditDialog from "../EditDialog";
import DeleteDialog from '../DeleteDialog';
import UserInfoContext from '../../../utils/Contexts/UserInfoContext';

export default function OptionsDialog() {
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const userInfo = useContext(UserInfoContext);

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  }

  const handleCloseEdit = () => {
    setOpenEdit(false);
  }

  const handleOpenDelete = () => {
    setOpenDelete(true);
  }

  const handleCloseDelete = () => {
    setOpenDelete(false);
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>

      <EditDialog open={openEdit} onClose={handleCloseEdit} userInfo={userInfo}/>
      <DeleteDialog open={openDelete} onClose={handleCloseDelete} userInfo={userInfo} />

      <Menu
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleOpenEdit}><Avatar><ModeEditOutlineOutlinedIcon /></Avatar>&nbsp;&nbsp;Editar usuário</MenuItem>
        <MenuItem onClick={handleOpenDelete}><Avatar><DeleteOutlineOutlinedIcon /></Avatar>&nbsp;&nbsp;Excluir usuário</MenuItem>
      </Menu>

    </div>
  );
}
