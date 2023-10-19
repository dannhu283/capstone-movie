import { Box, Grid, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { ButtonMain } from "../../../Components/ButtonMain";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPutUser } from "../../../APIs/userAPI";
import { useUserContext } from "../../../context/UserContext/UserContext";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Account({ username }) {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser, handleChangeCurrentUser } = useUserContext();

  const {
    mutate: handleEditProfile,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (username) => editPutUser(username),
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
      setOpenSuccess(true);
    },
  });

  const profileSchema = object({
    email: string()
      .required("Email không được để trống")
      .email("Email không đúng định dạng"),
    hoTen: string().required("Họ tên không được để trống"),
    soDT: string()
      .required("Số điện thoại không được để trống")
      .matches(/^(0[1-9][0-9]{8})$/, "Số điện thoại không đúng"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: currentUser,
    resolver: yupResolver(profileSchema),
    mode: "onTouched",
  });

  const onSubmit = (values) => {
    console.log(values);

    handleEditProfile(values);
    handleChangeCurrentUser(values);
  };

  const handleOpenSuccess = () => {
    setOpenSuccess(false);
  };

  const handleOpenError = () => {
    setOpenError(false);
  };

  return (
    <>
      <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
        <Box
          width={"80px"}
          height={"80px"}
          sx={{ borderRadius: "50%", marginTop: "16px" }}
        >
          <img
            src="/img/default-user-image.png"
            alt="account"
            width={"100%"}
            height={"100%"}
            style={{ borderRadius: "50%" }}
          />
        </Box>
        <ButtonMain
          m="20px 0 0 0"
          onClick={() => {
            navigate("/");
          }}
        >
          Quay về trang chủ
        </ButtonMain>
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Tài khoản"
              variant="outlined"
              disabled
              fullWidth
              error={!!errors.taiKhoan}
              helperText={errors.taiKhoan?.message}
              {...register("taiKhoan")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Họ tên"
              variant="outlined"
              fullWidth
              error={!!errors.hoTen}
              helperText={errors.hoTen?.message}
              {...register("hoTen")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Số điện thoại"
              variant="outlined"
              fullWidth
              error={!!errors.soDT}
              helperText={errors.soDT?.message}
              {...register("soDT")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Loại người dùng"
              variant="outlined"
              disabled
              fullWidth
              error={!!errors.maLoaiNguoiDung}
              helperText={errors.maLoaiNguoiDung?.message}
              {...register("maLoaiNguoiDung")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Mã nhóm"
              variant="outlined"
              disabled
              fullWidth
              error={!!errors.maNhom}
              helperText={errors.maNhom?.message}
              {...register("maNhom")}
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonMain variant="contained" type="submit" disabled={isLoading}>
              Cập nhật
            </ButtonMain>
          </Grid>
        </Grid>
      </Box>
      {/* Thông báo khi thành công */}
      <Modal
        open={openSuccess}
        onClose={handleOpenSuccess}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#fff",
            border: "1px solid #fff",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box display={"flex"} justifyContent={"center"}>
            <img
              style={{ width: "80px", marginTop: "10px" }}
              src="/img/animation_lnfs5c14_small.gif"
              alt="confirm"
            />
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Chỉnh sửa thông tin người dùng thành công
          </Typography>
        </Box>
      </Modal>
      {/* Thông báo khi thất bại */}
      <Modal
        open={openError}
        onClose={handleOpenError}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#fff",
            border: "1px solid #fff",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box display={"flex"} justifyContent={"center"}>
            <img
              style={{ width: "80px", marginTop: "10px" }}
              src="/img/animation_error_small.gif"
              alt="confirm"
            />
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {error}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
