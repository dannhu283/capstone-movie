import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Link } from "react-router-dom";
import Css from "./Signup.module.css";
import { signup } from "../../../../apis/userAPI";

//yup validation
const signupShema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string()
    .required("Mật khấu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
    ),
  email: string()
    .required("email không được để trống")
    .email("email không đúng định dạng"),
  hoTen: string().required("họ tên không được để trống"),
  soDt: string().required("Sô điện thoại không được để trống"),
});

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDt: "",
    },
    resolver: yupResolver(signupShema),
    mode: "onTouched",
  });

  const {
    mutate: handleSignup,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => signup(payload),
    onSuccess: () => {
      navigate("/sign-in");
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values) => {
    //call API sign up
    handleSignup(values);
  };

  return (
    <div className={Css.position}>
      <div className={Css.backGround}></div>
      <div className={Css.overlay}>
        <Container component="main" maxWidth="xs">
          <Paper elevation={3} className={Css.paper}>
            <AppRegistrationIcon sx={{ fontSize: "35px", color: "#3ae374" }} />
            <Typography
              variant="h5"
              sx={{ color: "#ff9f1a", fontWeight: "bold" }}
            >
              Đăng Kí
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} className={Css.form}>
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    color="success"
                    variant="outlined"
                    fullWidth
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email && errors.email.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Họ Tên"
                    color="success"
                    variant="outlined"
                    fullWidth
                    {...register("hoTen")}
                    error={!!errors.hoTen}
                    helperText={errors.hoTen && errors.hoTen.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Số Điện Thoại"
                    color="success"
                    variant="outlined"
                    fullWidth
                    {...register("soDt")}
                    error={!!errors.soDt}
                    helperText={errors.soDt && errors.soDt.message}
                  />
                  {error && <Typography color="red">{error}</Typography>}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={Css.submit}
                disabled={isLoading}
              >
                Đăng Ký
              </Button>
              <Button>
                <Link className={Css.titleBottom} to="/sign-in">
                  Bạn đã có tài khoản? Đăng nhập
                </Link>
              </Button>
            </form>
          </Paper>
        </Container>
      </div>
    </div>
  );
}
