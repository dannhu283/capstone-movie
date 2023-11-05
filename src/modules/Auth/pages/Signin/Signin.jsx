import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { Navigate, useSearchParams, Link } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { signin } from "../../../../APIs/userAPI";
import { useUserContext } from "../../../../context/UserContext/UserContext";
import SigninCss from "./Singin.module.css";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const { currentUser, handleSignin: onSigninSuccess } = useUserContext();

  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
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
    const redirectTo = searchParams.get("redirectTo");
    return <Navigate to={redirectTo || "/"} replace />;
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
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    {...register("matKhau")}
                    error={!!errors.matKhau}
                    helperText={errors.matKhau && errors.matKhau.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
