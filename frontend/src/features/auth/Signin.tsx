import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useLayoutEffect, useState } from "react";
import * as Yup from "yup";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { FormikTextField } from "../../components/FormikTextField";
import { fetchAsyncLoginUser } from "./api";
import { useAuthContext } from "./AuthContext";
import Loading from "../../components/Loading";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth, isLoading, signin } = useAuthContext();
  const [loginError, setLoginError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (state) => {
      try {
        await fetchAsyncLoginUser(state.email, state.password);
        signin();
        navigate("/");
      } catch (error: any) {
        setLoginError(error.detail || "Signin failed. Please try again.");
      }
    },
  });

  useLayoutEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          height: "100%",
          width: "360px",
          m: "20px auto",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
        </Box>
        <Typography>Signin</Typography>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <FormikTextField
              name="email"
              label="Email *"
              variant="standard"
              formik={formik}
            />
            <FormikTextField
              name="password"
              label="Password *"
              variant="standard"
              type="password"
              formik={formik}
            />
            <Button fullWidth variant="contained" type="submit">
              Signin
            </Button>
            {loginError && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {loginError}
              </div>
            )}
            <Link to={"/signup"}>Create account</Link>
          </Stack>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signin;
