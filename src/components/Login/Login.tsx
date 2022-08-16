import React, { ChangeEvent, FormEvent, useState } from "react";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { login, registration } from "../../store/authReducer";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export type FormDataType = typeof initialState;

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(registration({ formData, navigate }));
    } else {
      dispatch(login({ formData, navigate }));
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => setIsSignUp((prevState) => !prevState);

  return (
    <Container component={"main"} maxWidth={"xs"}>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant={"h5"}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name={"firstName"}
                  label={"First Name"}
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name={"lastName"}
                  label={"Last Name"}
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name={"email"}
              label={"Email Address"}
              handleChange={handleChange}
              type={"email"}
            />
            <Input
              name={"password"}
              label={"Password"}
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handlerShowPassword={() =>
                setShowPassword((prevState) => !prevState)
              }
            />
            {isSignUp && (
              <Input
                name={"confirmPassword"}
                label={"Confirm Password"}
                handleChange={handleChange}
                type={showConfirmPassword ? "text" : "password"}
                handlerShowPassword={() =>
                  setShowConfirmPassword((prevState) => !prevState)
                }
              />
            )}
          </Grid>
          <Button
            type={"submit"}
            fullWidth
            variant={"contained"}
            color={"primary"}
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Dont't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
