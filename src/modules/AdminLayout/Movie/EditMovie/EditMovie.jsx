import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateMovie, getMovieDetails } from "../../../../APIs/movieAPI";
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
import { object, string } from "yup";
import Loading from "../../../../Components/Loading";
import { useParams, useNavigate } from "react-router-dom";
import { ModalSuccess, ModalContent } from "../../../../Components/Modal";

export default function EditMovie() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [imgPreview, setImgPreview] = useState("");

  const [rating, setRating] = useState(2);

  const { data: inforMovie = [], isLoading } = useQuery({
    queryKey: ["inforMovie", movieId],
    queryFn: () => getMovieDetails(movieId),
    enabled: !!movieId,
  });

  const updatemovieShema = object({
    tenPhim: string().required("Tên phim không được để trống"),
    biDanh: string().required("Bí danh không được để trống"),
    moTa: string().required(
      "Mô tả phim để khán giả có thể dễ dàng nắm bắt được nội dung"
    ),
    trailer: string().required("Vui lòng cung cấp trailer của phim"),
    ngayKhoiChieu: string().required("Vui lòng chọn ngày "),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      hinhAnh: "",
      trailer: "",
      ngayKhoiChieu: "",
      hot: false,
      dangChieu: false,
      sapChieu: false,
      danhGia: 2,
    },
    resolver: yupResolver(updatemovieShema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (inforMovie) {
      setValue("tenPhim", inforMovie.tenPhim);
      setValue("biDanh", inforMovie.biDanh);
      setValue("moTa", inforMovie.moTa);
      setImgPreview(inforMovie.hinhAnh);
      setValue("trailer", inforMovie.trailer);
      setValue("ngayKhoiChieu", inforMovie.ngayKhoiChieu);
      setValue("hot", inforMovie.hot);
      setValue("dangChieu", inforMovie.dangChieu);
      setValue("sapChieu", inforMovie.sapChieu);
      if (inforMovie.danhGia !== undefined) {
        setRating(inforMovie.danhGia);
      }
    }
  }, [inforMovie, setValue]);

  const hinhAnh = watch("hinhAnh");

  useEffect(() => {
    const file = hinhAnh?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      setImgPreview(event.target.result);
    };
  }, [hinhAnh]);

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      const formData = new FormData();
      formData.append("maPhim", movieId);
      formData.append("tenPhim", values.tenPhim);
      formData.append("biDanh", values.biDanh);
      formData.append("moTa", values.moTa);
      formData.append("hinhAnh", values.hinhAnh[0]);
      formData.append("trailer", values.trailer);
      formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
      formData.append("maNhom", "GP09");
      formData.append("hot", values.hot);
      formData.append("dangChieu", values.dangChieu);
      formData.append("sapChieu", values.sapChieu);
      formData.append("danhGia", rating);
      return updateMovie(formData);
    },
    onSuccess: () => {
      setShowSuccessModal(true);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Box mt={7}>
        <Typography variant="h4" gutterBottom>
          📒📒 Cập Nhật Phim
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
            <Controller
              name="hot"
              control={control}
              render={({ field }) => {
                return (
                  <FormControlLabel
                    control={<Switch {...field} checked={field.value} />}
                    label="Hot"
                  />
                );
              }}
            />
          </Grid>
          {/* đang chiếu */}
          <Grid item xs={4}>
            <Controller
              name="dangChieu"
              control={control}
              render={({ field }) => {
                return (
                  <FormControlLabel
                    control={<Switch {...field} checked={field.value} />}
                    label="Đang chiếu"
                  />
                );
              }}
            />
          </Grid>
          {/* Sắp chiếu */}
          <Grid item xs={4}>
            <Controller
              name="sapChieu"
              control={control}
              render={({ field }) => {
                return (
                  <FormControlLabel
                    control={<Switch {...field} checked={field.value} />}
                    label="Sắp chiếu"
                  />
                );
              }}
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
          </Grid>
          {/* rating */}
          <Grid item xs={12}>
            <Typography component="legend">Đánh Giá</Typography>
            <Rating
              name="customized-10"
              value={rating}
              max={10}
              onChange={(evt, value) => {
                setRating(value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonMain variant="contained" color="primary" type="submit">
              Cập Nhật
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
              Cập nhật phim thành công
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
