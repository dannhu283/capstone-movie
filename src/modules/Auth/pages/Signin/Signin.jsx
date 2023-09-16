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
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link } from "react-router-dom";
import SigninCss from "./Singin.module.css";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    // Gọi API đăng nhập
  };

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
