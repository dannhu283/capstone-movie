import React from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useState } from "react";
import { ButtonMain } from "../../../../../Components/ButtonMain";
import ErrorIcon from "@mui/icons-material/Error";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useMutation } from "@tanstack/react-query";
import { addUser } from "../../../../../APIs/userAPI";

export default function AddUser() {
  const [codeUser, setCodeUser] = useState("");
  // const [dataLoaded, setDataLoaded] = useState(false);
  const [openError, setOpenError] = React.useState(true);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const addUserSchema = object({
    taiKhoan: string().required("Tài khoản không được để trống"),
    matKhau: string()
      .required("Mật khẩu không được để trống")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
        "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
      ),
    email: string()
      .required("Email không được để trống")
      .email("Email không đúng định dạng"),
    hoTen: string().required("Họ tên không được để trống"),
    soDt: string()
      .required("Số điện thoại không được để trống")
      .matches(/^(0[1-9][0-9]{8})$/, "Số điện thoại không đúng"),
    maLoaiNguoiDung: string().required("Vui lòng loại người dùng"),
  });

  const { mutate: handleAddUser, error } = useMutation({
    mutationFn: (payload) => addUser(payload),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP09",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    resolver: yupResolver(addUserSchema),
    mode: "onTouched",
  });

  const onSubmit = (values) => {
    console.log(values);
    // Gọi API đăng ký
    handleAddUser(values);
  };

  const handleChange = (event) => {
    setValue("maLoaiNguoiDung", event.target.value);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        🎬🎬 Thêm người dùng
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        mt={2}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Tài khoản"
              variant="outlined"
              fullWidth
              error={!!errors.taiKhoan}
              helperText={errors.taiKhoan?.message}
              {...register("taiKhoan")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Mật khẩu"
              variant="outlined"
              fullWidth
              error={!!errors.matKhau}
              helperText={errors.matKhau?.message}
              {...register("matKhau")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
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
              label="Họ tên"
              variant="outlined"
              fullWidth
              error={!!errors.hoTen}
              helperText={errors.hoTen?.message}
              {...register("hoTen")}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth error={!!errors.maLoaiNguoiDung}>
              <InputLabel id="maLoaiNguoiDung">Loại người dùng</InputLabel>
              <Select
                labelId="maLoaiNguoiDung"
                id="maLoaiNguoiDung"
                // value={codeUser}
                label="Loại người dùng"
                onChange={handleChange}
                // defaultValue={infoUser.maLoaiNguoiDung}
                // error={!!errors.maLoaiNguoiDung}
                // helperText={errors.maLoaiNguoiDung?.message}
                {...register("maLoaiNguoiDung")}
              >
                <MenuItem value={""}>Chọn loại người dùng</MenuItem>
                <MenuItem value={"KhachHang"}>Khách hàng</MenuItem>
                <MenuItem value={"QuanTri"}>Quản trị viên</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box display={"flex"} justifyContent={"right"}>
          <ButtonMain variant="contained" m="16px 0 0 0" type="submit">
            Thêm người dùng
          </ButtonMain>
        </Box>

        {/* Hiện thông báo lỗi */}
        {/* {!!error && (
          <Modal
            open={openError}
            onClose={handleCloseError}
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
              <ErrorIcon color="error" />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {error}
              </Typography>
            </Box>
          </Modal>
        )} */}

        {/* Thông báo khi chỉnh sửa thành công */}
        <Modal
          open={openSuccess}
          onClose={handleCloseSuccess}
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
            <CheckBoxIcon color="success" />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Chỉnh sửa thông tin người dùng thành công
            </Typography>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
