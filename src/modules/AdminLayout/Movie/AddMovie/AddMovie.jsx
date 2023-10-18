import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { addMovie } from "../../../../APIs/movieAPI";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Rating,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import { ButtonMain } from "../../../../Components/ButtonMain";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { ModalSuccess, ModalContent } from "../../../../Components/Modal";

//MUI switch
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function AddMovie() {
  const navigate = useNavigate();
  const [isHot, setIsHot] = useState(false);
  const [isNowShowing, setIsNowShowing] = useState(false);
  const [isComingSoon, setIsComingSoon] = useState(false);
  const [rating, setRating] = useState(2);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const addmovieShema = object({
    tenPhim: string().required("Tên phim không được để trống"),
    biDanh: string().required("Bí danh không được để trống"),
    moTa: string().required("Vui lòng nhập mô tả"),
    trailer: string().required("Vui lòng cung cấp trailer của phim"),
    ngayKhoiChieu: string().required("Vui lòng chọn ngày "),
    hinhAnh: string().required("Vui lòng chọn hình ảnh"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      hinhAnh: "",
      trailer: "",
      ngayKhoiChieu: "",
    },
    resolver: yupResolver(addmovieShema),
    mode: "onTouched",
  });

  const hinhAnh = watch("hinhAnh");

  const [imgPreview, setImgPreview] = useState("");
  useEffect(() => {
    // Chạy vào useEffect callback khi giá trị của hinhAnh bị thay đổi
    const file = hinhAnh?.[0];
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      setImgPreview(event.target.result);
    };
  }, [hinhAnh]);

  const { mutate: onSubmit, error } = useMutation({
    mutationFn: (values) => {
      const formData = new FormData();
      formData.append("tenPhim", values.tenPhim);
      formData.append("biDanh", values.biDanh);
      formData.append("moTa", values.moTa);
      formData.append("hinhAnh", values.hinhAnh[0]);
      formData.append("trailer", values.trailer);
      formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
      formData.append("maNhom", "GP09");
      formData.append("hot", isHot);
      formData.append("dangChieu", isNowShowing);
      formData.append("sapChieu", isComingSoon);
      formData.append("danhGia", rating);

      return addMovie(formData);
    },
    onSuccess: () => {
      setShowSuccessModal(true);
    },
  });

  return (
    <Container>
      <Box mt={7}>
        <Typography variant="h4" gutterBottom>
          🎬🎬Thêm Phim
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* ten */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tên phim"
              variant="outlined"
              color="success"
              {...register("tenPhim")}
              error={!!errors.tenPhim}
              helperText={errors.tenPhim && errors.tenPhim.message}
            />
          </Grid>
          {/* bidanh */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Bí danh"
              color="success"
              {...register("biDanh")}
              variant="outlined"
              error={!!errors.biDanh}
              helperText={errors.biDanh && errors.biDanh.message}
            />
          </Grid>
          {/* trailer */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Trailer"
              variant="outlined"
              color="success"
              {...register("trailer")}
              error={!!errors.trailer}
              helperText={errors.trailer && errors.trailer.message}
            />
          </Grid>
          {/* ngaykhoichieu */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Ngày khởi chiếu"
              color="success"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              {...register("ngayKhoiChieu", {
                setValueAs: (values) => {
                  return dayjs(values).format("DD/MM/YYYY");
                },
              })}
              error={!!errors.ngayKhoiChieu}
              helperText={errors.ngayKhoiChieu && errors.ngayKhoiChieu.message}
            />
          </Grid>
          {/* mota */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mô tả"
              variant="outlined"
              color="success"
              {...register("moTa")}
              multiline
              error={!!errors.moTa}
              helperText={errors.moTa && errors.moTa.message}
            />
          </Grid>
          {/* hot */}
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => setIsHot(!isHot)}
                  checked={isHot}
                />
              }
              label="Hot"
            />
          </Grid>
          {/* đang chiếu */}
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => setIsNowShowing(!isNowShowing)}
                  checked={isNowShowing}
                />
              }
              label="Đang chiếu"
            />
          </Grid>
          {/* Sắp chiếu */}
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => setIsComingSoon(!isComingSoon)}
                  checked={isComingSoon}
                />
              }
              label="Sắp chiếu"
            />
          </Grid>
          {/* hinhanh */}
          <Grid item xs={12}>
            <input type="file" {...register("hinhAnh")} />
            {imgPreview && (
              <Box>
                <img src={imgPreview} alt="preview" width={200} height={200} />
              </Box>
            )}
            <Typography sx={{ color: "red" }}>{error}</Typography>
          </Grid>
          {/* rating */}
          <Grid item xs={12}>
            <Typography component="legend">Đánh Giá</Typography>
            <Rating
              name="customized-10"
              defaultValue={2}
              value={rating}
              max={10}
              onChange={(evt, value) => {
                setRating(value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonMain variant="contained" color="primary" type="submit">
              Thêm Phim
            </ButtonMain>
          </Grid>
        </Grid>
      </form>
      {showSuccessModal && (
        <ModalSuccess>
          <ModalContent>
            <img
              style={{ width: "120px", marginTop: "10px" }}
              src="/img/animation_lnfs5c14_small.gif"
              alt="confirm"
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "40px" }}
            >
              Thêm phim thành công
            </Typography>

            <ButtonMain
              variant="contained"
              color="primary"
              onClick={() => navigate("/admin/moviemanagement")}
            >
              Đồng ý
            </ButtonMain>
          </ModalContent>
        </ModalSuccess>
      )}
    </Container>
  );
}
