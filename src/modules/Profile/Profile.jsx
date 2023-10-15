import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { ButtonMain } from "../../Components/ButtonMain";
import { useUserContext } from "../../context/UserContext/UserContext";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editUser, getInfoUser } from "../../APIs/userAPI";
import Loading from "../../Components/Loading";

export default function Profile() {
  // const [info, setInfo] = React.useState([]);

  const { username } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser } = useUserContext();

  const { data: profile = [], isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getInfoUser(username),
    enabled: !!username,
  });
  console.log(profile);

  const { mutate: handleEditProfile, error } = useMutation({
    mutationFn: (username) => editUser(username),
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
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
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: currentUser,
    // {
    //   taiKhoan: profile.taiKhoan,
    //   email: profile.email,
    //   hoTen: profile.hoTen,
    //   soDT: profile.soDT,
    //   maLoaiNguoiDung: profile.maLoaiNguoiDung,
    //   maNhom: "GP09",
    // },
    resolver: yupResolver(profileSchema),
    mode: "onTouched",
  });

  const onSubmit = (values) => {
    console.log(values);
    handleEditProfile(values);
  };

  React.useEffect(() => {
    for (const key in profile) {
      if (profile.hasOwnProperty.call(object, key)) {
        setValue(key, profile[key]);
      }
    }
  }, [profile]);

  if (!profile) {
    return null;
  }
  if (isLoading) {
    <Loading />;
  }
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#f6f9fc",
        paddingTop: "64px",
      }}
    >
      <Container>
        <Typography variant="h3" component="h2">
          Profile
        </Typography>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            marginTop: "24px",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box display={"flex"} alignItems={"center"}>
            <PersonOutlineOutlinedIcon fontSize="large" color="success" />
            <Typography variant="h5" component="h5" ml={1}>
              Thông tin cá nhân
            </Typography>
          </Box>
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
                navigate("/admin");
              }}
            >
              Đi tới trang admin
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
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email")}
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
                <ButtonMain variant="contained" type="submit">
                  Cập nhật
                </ButtonMain>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
