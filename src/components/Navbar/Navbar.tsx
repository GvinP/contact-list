import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStyles from "./styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import decode from "jwt-decode";
import { AuthDataType } from "../../api/api";
import { useAppDispatch } from "../../store/store";
import { logoutAction } from "../../store/authReducer";

type DecodedTokenType = {
  email: string;
  exp: number;
  iat: number;
  id: string;
};

export const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<AuthDataType>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  const signIn = () => navigate("/login");
  const logout = () => {
    localStorage.removeItem("user");
    dispatch(logoutAction());
    navigate("/login");
    setUser({} as AuthDataType);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode<DecodedTokenType>(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("user") || "{}"));
  }, []);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to={"/"} className={classes.heading}>
        <Typography variant={"h6"} className={classes.headingText}>
          Contact List
        </Typography>
      </Link>
      <Toolbar>
        {Object.keys(user).length ? (
          <div className={classes.profile}>
            <Typography className={classes.userName} variant={"h6"}>
              {user.result?.name}
            </Typography>
            <Button
              variant={"contained"}
              className={classes.logout}
              color={"secondary"}
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className={classes.toolbar}>
            <Button
              className={classes.logout}
              onClick={signIn}
              variant={"contained"}
              color={"primary"}
            >
              Sign In
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};
