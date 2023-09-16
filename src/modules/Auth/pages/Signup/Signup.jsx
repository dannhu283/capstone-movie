import React from "react";
import { useForm } from "react-hook-form";
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

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    // Gọi API đăng ký
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
                    {...register("taiKhoan", {
                      required: "Tài khoản không được để trống",
                    })}
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
                    {...register("matKhau", {
                      required: "Mật khẩu không được để trống",
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                        message:
                          "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số",
                      },
                    })}
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
                    {...register("email", {
                      required: "Email không được để trống",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Email không hợp lệ,vui lòng kiểm tra lại",
                      },
                    })}
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
                    {...register("hoTen", {
                      required: "Họ Tên không được để trống",
                    })}
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
                    {...register("soDt", {
                      required:
                        "Vui lòng nhập số điện thoại để có nhiều ưu đãi hơn",
                      pattern: {
                        value: /^\d{10,12}$/,
                        message: "Số điện thoại không hợp lệ",
                      },
                    })}
                    error={!!errors.soDt}
                    helperText={errors.soDt && errors.soDt.message}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={Css.submit}
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
