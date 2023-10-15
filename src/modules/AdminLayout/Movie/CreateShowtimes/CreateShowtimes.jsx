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
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTheaterSystem, getInforTheater } from "../../../../APIs/cinemaAPI";
import { getMovieDetails } from "../../../../APIs/movieAPI";
import { addShowtimes } from "../../../../APIs/bookTicketAPI";
import Loading from "../../../../Components/Loading";
import { Controller, useForm } from "react-hook-form";
import { ButtonMain } from "../../../../Components/ButtonMain";
import { useParams } from "react-router-dom";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Title } from "./index";
import { ModalSuccess, ModalContent } from "../../../../Components/Modal";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function CreateShowtimes() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [selectedSystem, setSelectedSystem] = useState("");
  const [selectedCumRap, setSelectedCumRap] = useState("");
  const [theaterInformation, setTheaterInformation] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const addCalendarShema = object({
    maHeThongRap: string().required("Vui lòng chọn hệ thống rạp"),
    maRap: string().required("Vui lòng chọn cụm rạp"),
    ngayChieuGioChieu: string().required("Vui lòng chọn ngày"),
    giaVe: string().required("Vui lòng nhập giá vé"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      maHeThongRap: "",
      maRap: "",
      ngayChieuGioChieu: "",
      giaVe: "",
    },
    resolver: yupResolver(addCalendarShema),
    mode: "onTouched",
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

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      return addShowtimes({ ...values, maPhim: movieId });
    },
    onSuccess: () => {
      setShowSuccessModal(true);
    },
  });

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
                  <InputLabel>Chọn Hệ Thống Rạp</InputLabel>
                  <Controller
                    control={control}
                    defaultValue=""
                    name="maHeThongRap"
                    render={({ field }) => (
                      <Select
                        autoWidth
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChangeSystem(e);
                        }}
                        label="Chọn Hệ Thống Rạp"
                      >
                        <MenuItem value=" ">
                          <em>------</em>
                        </MenuItem>
                        {theaterSystem.map((system) => (
                          <MenuItem
                            key={system.maHeThongRap}
                            value={system.maHeThongRap}
                          >
                            {system.maHeThongRap}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              {/* Cụm rạp */}
              <Grid item xs={12}>
                <Title>Cụm Rạp :</Title>
                <FormControl sx={{ m: 1, minWidth: "80%" }} color="success">
                  <InputLabel>Chọn Cụm Rạp</InputLabel>
                  <Controller
                    control={control}
                    defaultValue=""
                    name="maRap"
                    render={({ field }) => (
                      <Select
                        value={selectedCumRap}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChangeCumRap(e);
                        }}
                        autoWidth
                        label="Chọn Cụm Rạp"
                        {...field}
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
                    )}
                  />
                </FormControl>
              </Grid>
              {/* Ngày giờ chiếu */}
              <Grid item xs={12}>
                <Title>Ngày Giờ Chiếu</Title>
                <FormControl sx={{ m: 1, minWidth: "80%" }} color="success">
                  <TextField
                    color="success"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("ngayChieuGioChieu", {
                      setValueAs: (values) => {
                        return dayjs(values).format("DD/MM/YYYY hh:mm:ss");
                      },
                    })}
                    error={!!errors.ngayChieuGioChieu}
                    helperText={
                      errors.ngayChieuGioChieu &&
                      errors.ngayChieuGioChieu.message
                    }
                  />
                </FormControl>
              </Grid>
              {/* Giá vé */}
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
                <ButtonMain
                  type="submit"
                  onClick={() => navigate("/admin/moviemanagement")}
                >
                  Thêm Lịch Chiếu
                </ButtonMain>
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
              Thêm lịch chiếu thành công
            </Typography>

            <ButtonMain
              variant="contained"
              color="primary"
              onClick={() => setShowSuccessModal(false)}
            >
              Đồng ý
            </ButtonMain>
          </ModalContent>
        </ModalSuccess>
      )}
    </>
  );
}
