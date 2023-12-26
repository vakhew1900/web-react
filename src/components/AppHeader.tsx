import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { server_address } from "../server_adress";
import useSetIsAuth from "../hooks/useIsAuth";
import useSetPosts from "../hooks/useSetPosts";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const setIsAuth = useSetIsAuth();
  const setPosts = useSetPosts();
  const routeChange = (path: string) => {
    navigate(path);
  };

  
  let buttons = (
    <>
      <Button
        color="inherit"
        onClick={() => {
          routeChange("signup");
        }}
      >
        Sign Up
      </Button>
      <Button
        color="inherit"
        onClick={() => {
          routeChange("login");
        }}
      >
        Login
      </Button>
    </>
  );

  console.log(Cookies.get('token'))
  if(Cookies.get('token') != undefined && Cookies.get('token') != null){
    buttons = (
      <>
      <Button
        color="inherit"
        onClick={() => {
          fetch(server_address + "/api/users/logout", {
            method: "POST",
            credentials: "include",
          })
          .then(() => { setIsAuth?.(false);  setPosts?.([]); routeChange("/login")})
        }}
      >
        Logout
      </Button>

      </>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={"success"}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              routeChange("/");
            }}
          >
            News
          </Typography>

          {buttons}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
