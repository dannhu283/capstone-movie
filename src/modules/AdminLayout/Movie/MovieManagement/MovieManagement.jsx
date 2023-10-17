import React, { useState } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { deleteMovie, getMovies } from "../../../../APIs/movieAPI";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import { StyledTableCell, StyledTableRow } from "./index";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TextField from "@mui/material/TextField";
import Loading from "../../../../Components/Loading";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ModalSuccess, ModalContent } from "../../../../Components/Modal";
import { ButtonCustom, ButtonMain } from "../../../../Components/ButtonMain";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function UserManagement() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: getMovies,
  });

  const filteredMovies = movies.filter((movie) =>
    movie.tenPhim.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - movies.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteConfirmed = async () => {
    if (movieToDelete) {
      await deleteMovie(movieToDelete);
      queryClient.invalidateQueries("movie");
      setShowSuccessModal(true);
    }
    setShowConfirmModal(false);
  };

  const handleConfirmDelete = (movieId) => {
    setMovieToDelete(movieId);
    setShowConfirmModal(true);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(false);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Box height={100} />
      <Typography sx={{ marginBottom: "30px", fontSize: "30px" }}>
        📒📒 Danh Sách Phim
      </Typography>
      <TextField
        sx={{ marginBottom: "20px", width: "100%" }}
        color="success"
        label="Tìm kiếm phim"
        value={searchQuery}
        onChange={handleSearchInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Mã Phim
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Hình Ảnh
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Tên Phim
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Ngày Khởi Chiếu
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Mô Tả
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Chức năng
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredMovies.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredMovies
            ).map((movie) => (
              <StyledTableRow key={movie.maPhim}>
                <StyledTableCell>{movie.maPhim}</StyledTableCell>
                <StyledTableCell>
                  <img src={movie.hinhAnh} alt={movie.tenPhim} width={200} />
                </StyledTableCell>
                <StyledTableCell>{movie.tenPhim}</StyledTableCell>
                <StyledTableCell>
                  {dayjs(movie.ngayKhoiChieu).format("DD/MM/YYYY")}
                </StyledTableCell>
                <StyledTableCell>{movie.moTa}</StyledTableCell>
                <StyledTableCell>
                  <Box sx={{ display: "flex" }}>
                    <Tooltip title="Cập nhật" placement="top-start">
                      <IconButton
                        aria-label="update"
                        size="large"
                        onClick={() =>
                          navigate(`/admin/editmovie/${movie.maPhim}`)
                        }
                      >
                        <EditIcon fontSize="inherit" color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xoá" placement="top-start">
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => handleConfirmDelete(movie.maPhim)}
                      >
                        <DeleteIcon fontSize="inherit" color="error" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Thêm Lịch" placement="top-start">
                      <IconButton
                        aria-label="setup"
                        size="large"
                        onClick={() =>
                          navigate(`/admin/showtime/${movie.maPhim}`)
                        }
                      >
                        <CalendarMonthIcon fontSize="inherit" color="success" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={movies.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {showConfirmModal && (
        <ModalSuccess>
          <ModalContent>
            <img
              style={{ width: "120px", marginTop: "10px" }}
              src="/img/animation_lnov06bj_small.gif"
              alt="confirm"
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "40px" }}
            >
              Bạn có muốn xóa phim
            </Typography>

            <ButtonMain variant="contained" onClick={handleCloseModal}>
              Hủy
            </ButtonMain>
            <ButtonCustom onClick={handleDeleteConfirmed}>Đồng ý</ButtonCustom>
          </ModalContent>
        </ModalSuccess>
      )}

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
              Xóa phim thành công
            </Typography>

            <ButtonMain
              variant="contained"
              color="primary"
              onClick={handleCloseModal}
            >
              Đồng ý
            </ButtonMain>
          </ModalContent>
        </ModalSuccess>
      )}
    </>
  );
}
