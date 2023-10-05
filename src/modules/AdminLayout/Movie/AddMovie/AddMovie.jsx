import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addMovie } from "../../../../APIs/movieAPI";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export default function AddMovie() {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      hinhAnh: "",
      trailer: "",
      ngayKhoiChieu: "",
    },
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

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      const formData = new FormData();
      formData.append("tenPhim", values.tenPhim);
      formData.append("biDanh", values.biDanh);
      formData.append("moTa", values.moTa);
      formData.append("hinhAnh", values.hinhAnh[0]);
      formData.append("trailer", values.trailer);
      formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
      formData.append("maNhom", "GP01");

      return addMovie(formData);
    },
    onSuccess: () => {
      // Đóng modal hoặc chuyển trang
      // Sử dụng queryClient.invalidateQueries để gọi lại API get danh sách phim
    },
  });

  return (
    <Container>
      <Box mt={7}>
        <Typography variant="h4" gutterBottom>
          Add Movie
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tên phim"
              {...register("tenPhim")}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Bí danh"
              {...register("biDanh")}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mô tả"
              {...register("moTa")}
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <input type="file" {...register("hinhAnh")} />
            {imgPreview && (
              <div>
                <img src={imgPreview} alt="preview" width={200} height={200} />
              </div>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Trailer"
              {...register("trailer")}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ngày khởi chiếu"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register("ngayKhoiChieu", {
                setValueAs: (values) => {
                  return dayjs(values).format("YYYY-MM-DD");
                },
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Thêm Phim
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
