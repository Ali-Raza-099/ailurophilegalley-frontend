import React from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import userService from "../Services/userService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = (props) => {
  let navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <>
        <Grid container spacing={3}>
            <Grid item xs={12}> 
                <h4>Login</h4>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <TextField
                    label="Email"
                    margin="normal"
                    fullWidth
                    value={email}
                    onChange={(e) => {setEmail(e.target.value);}}
                />
                <TextField
                    label="Password"
                    type="password"
                    margin="normal"
                    fullWidth
                    value={password}
                    onChange={(e) => {setPassword(e.target.value);}}
                />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <Button variant="contained" color="primary" fullWidth onClick={(e) => {
            userService
              .login(email, password)
              .then((data) => {
                navigate("/PhotoCollection/:page", { replace: true });
                window.location.reload();
              })
              .catch((err) => {
                toast.error(err.response.data, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
              });
          }}>Login</Button>
          <Typography sx={{ m: 1.0 }} align='center'>Have you not registered? <Link to='/ailurophile-gallery/register'>Register</Link></Typography>
            </Grid>
        </Grid>
        </>
  );
};

export default Login;