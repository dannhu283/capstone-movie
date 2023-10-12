import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  TextField,
  FormHelperText,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTheaterSystem, getInforTheater } from "../../../../APIs/cinemaAPI";
import { getMovieDetails } from "../../../../APIs/movieAPI";
import { addShowtimes } from "../../../../APIs/bookTicketAPI";
import Loading from "../../../../Components/Loading";
import { useForm } from "react-hook-form";
import { ButtonMain } from "../../../../Components/ButtonMain";
import { useParams } from "react-router-dom";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Title } from "./index";

export default function CreateShowtimes() {
  const { movieId } = useParams();
  const [selectedSystem, setSelectedSystem] = useState("");
  const [selectedCumRap, setSelectedCumRap] = useState("");
  const [theaterInformation, setTheaterInformation] = useState([]);

  const addCalendarShema = object({
    maHeThongRap: string().required("Vui lòng chọn hệ thống rạp"),
    cumRap: string().required("Vui lòng chọn cụm rạp"),
    ngayChieuGioChieu: string().required("Vui lòng chọn ngày"),
    giaVe: string().required("Vui lòng nhập giá vé"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      maHeThongRap: "",
      cumRap: "",
      ngayChieuGioChieu: "",
      giaVe: "",
    },
    resolver: yupResolver(addCalendarShema),
    mode: "all",
  });

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      const formData = new FormData();
      formData.append("maPhim", movieId);
      formData.append("ngayChieuGioChieu", values.ngayChieuGioChieu);

      return addShowtimes(formData);
    },
    onSuccess: () => {},
  });

  const { data: movieDetails = [], isLoading: isDetailLoading } = useQuery({
    queryKey: ["movieDetails", movieId],
    queryFn: () => getMovieDetails(movieId),
  });

  const { data: theaterSystem = [], isLoading } = useQuery({
    queryKey: ["systemTheater"],
    queryFn: getTheaterSystem,
  });

  useEffect(() => {
    if (selectedSystem) {
      getInforTheater(selectedSystem)
        .then((theaterInfo) => {
          setTheaterInformation(theaterInfo);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedSystem]);

  const handleChangeSystem = (evt) => {
    setSelectedSystem(evt.target.value);
  };

  const handleChangeCumRap = (evt) => {
    setSelectedCumRap(evt.target.value);
  };

  if (isLoading && isDetailLoading) {
    return <Loading />;
  }

  return (
    <>
      <Box marginY={7}>
        <Typography variant="h4" gutterBottom sx={{ color: "#192a56" }}>
          🗓️🗓️ Thêm Lịch Chiếu
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Title>Hệ Thống Rạp:</Title>
                <FormControl sx={{ m: 1, minWidth: "80%" }} color="success">
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Chọn Hệ Thống Rạp
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={selectedSystem}
                    onChange={handleChangeSystem}
                    autoWidth
                    label="Chọn Hệ Thống Rạp"
                    // {...register("maHeThongRap")}
                  >
                    {theaterSystem.map((system) => (
                      <MenuItem
                        key={system.maHeThongRap}
                        value={system.maHeThongRap}
                      >
                        {system.maHeThongRap}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error={!!errors.maHeThongRap}>
                    {errors.maHeThongRap?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Title>Cụm Rạp :</Title>
                <FormControl sx={{ m: 1, minWidth: "80%" }} color="success">
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Chọn Cụm Rạp
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={selectedCumRap}
                    onChange={handleChangeCumRap}
                    autoWidth
                    label="Chọn Cụm Rạp"
                  >
                    <MenuItem value=" ">
                      <em>------</em>
                    </MenuItem>
                    {theaterInformation.map((info) => (
                      <MenuItem key={info.maCumRap} value={info.maCumRap}>
                        {info.maCumRap}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error={!!errors.cumRap}>
                    {errors.cumRap?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Title>Ngày Giờ Chiếu</Title>
                <FormControl sx={{ m: 1, minWidth: "80%" }} color="success">
                  <TextField
                    color="success"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("ngayChieuGioChieu")}
                    error={!!errors.ngayChieuGioChieu}
                    helperText={
                      errors.ngayChieuGioChieu &&
                      errors.ngayChieuGioChieu.message
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Title>Giá vé</Title>
                <FormControl sx={{ m: 1, minWidth: "80%" }} color="success">
                  <TextField
                    type="number"
                    color="success"
                    {...register("giaVe")}
                    error={!!errors.giaVe}
                    helperText={errors.giaVe && errors.giaVe.message}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <ButtonMain type="submit">Thêm Lịch Chiếu</ButtonMain>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <img
              src={movieDetails.hinhAnh}
              alt={movieDetails.biDanh}
              style={{ width: "80%", borderRadius: "10px" }}
            />
            <Typography
              sx={{
                marginTop: "20px",
                color: "#192a56",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              {movieDetails.tenPhim}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
