import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { Navigate, useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link } from "react-router-dom";
import SigninCss from "./Singin.module.css";
import { Checkbox, FormControlLabel } from "@mui/material";
import { signin } from "../../../../apis/userAPI";
import { useUserContext } from "../../../../context/UserContext/UserContext";

const signinShema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string()
    .required("Mật khấu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
    ),
});

export default function Signin() {
  const { currentUser, handleSignin: onSigninSuccess } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: yupResolver(signinShema),
    mode: "onTouched",
  });

  const {
    mutate: handleSignin,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (payload) => signin(payload),
    onSuccess: (data) => {
      onSigninSuccess(data);
    },
  });

  const onSubmit = (values) => {
    handleSignin(values);
  };
  //currentUser khác null có nghĩ là user đã đăng nhập=> điều hướng về Home
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={SigninCss.position}>
      <div className={SigninCss.backGround}></div>
      <div className={SigninCss.overlay}>
        <Container component="main" maxWidth="xs">
          <Paper elevation={3} className={SigninCss.paper}>
            <HowToRegIcon sx={{ fontSize: "35px", color: "#3ae374" }} />
            <Typography
              variant="h5"
              sx={{ color: "#ff9f1a", fontWeight: "bold" }}
            >
              Đăng Nhập
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={SigninCss.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Tài Khoản"
                    color="success"
                    variant="outlined"
                    fullWidth
                    {...register("taiKhoan")}
                    error={!!errors.taiKhoan}
                    helperText={errors.taiKhoan && errors.taiKhoan.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Mật khẩu"
                    color="success"
                    type="password"
                    variant="outlined"
                    fullWidth
                    {...register("matKhau")}
                    error={!!errors.matKhau}
                    helperText={errors.matKhau && errors.matKhau.message}
                  />
                  {error && <Typography color="red">{error}</Typography>}
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox color="success" />}
                    label="Lưu Tài Khoản"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={SigninCss.submit}
                disabled={isLoading}
              >
                Đăng Nhập
              </Button>
              <Button>
                <Link className={SigninCss.titleBottom} to="/sign-up">
                  Bạn chưa có tài khoản? Đăng kí ngay
                </Link>
              </Button>
            </form>
          </Paper>
        </Container>
      </div>
    </div>
  );
}
