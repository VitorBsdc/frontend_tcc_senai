import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InsightsIcon from "@mui/icons-material/Insights";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function MenuMobile({ pageName, user, typeUser, logoutFunc }) {
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
	  console.log(typeUser)
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <React.Fragment>
      <IconButton onClick={toggleDrawer("right", true)}>
        <MenuIcon sx={{ fontSize: 35 }} />
      </IconButton>
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        <Box
          sx={{ width: 270 }}
          onClick={toggleDrawer("right", false)}
          onKeyDown={toggleDrawer("right", false)}
        >
          <List>
            <ListItem>
              <h1 className="pageName-menu-mobile">{pageName}</h1>
            </ListItem>
            <ListItem>
              <div className="item-menu-mobile-user">
                <h4 className="userName-menu-mobile">{user}</h4>
                <span className="typeuUser-menu-mobile">
                  {typeUser ? "Administrador" : "Usuário Comum"}
                </span>
              </div>
            </ListItem>
          </List>
          <Divider />
          <List>
            {typeUser && (
              <ListItem button onClick={() => navigate("/admin")}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Gerenciar Usuários" />
              </ListItem>
            )}

            <ListItem
              button
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("idUser");
                navigate("/dashboard");
              }}
            >
              <ListItemIcon>
                <InsightsIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => logoutFunc()}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItem>
          </List>
          <Divider />
        </Box>
      </SwipeableDrawer>
    </React.Fragment>
  );
}
