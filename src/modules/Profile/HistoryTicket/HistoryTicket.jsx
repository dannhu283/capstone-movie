import {
  Box,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from "@mui/material";
import React from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../AdminLayout/User/UserManagement/styledTable";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import PropTypes from "prop-types";
import ReorderIcon from "@mui/icons-material/Reorder";
import SeatListProfile from "./SeatListProfile";

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

export default function HistoryTicket({ infoTicket }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openSeatList, setOpenSeatList] = React.useState(false);
  const [seatList, setSeatList] = React.useState([]);

  console.log(infoTicket);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - infoTicket.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenSeatList = (seatList) => {
    setSeatList(seatList);
    setOpenSeatList(true);
  };
  const handleCloseSeatList = () => setOpenSeatList(false);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Mã vé
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Tên phim
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Hình ảnh
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Ngày đặt
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Thời lượng phim
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Giá vé
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Danh sách ghế
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? infoTicket.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : infoTicket
            ).map((index) => (
              <StyledTableRow key={index.maVe}>
                <StyledTableCell>{index.maVe}</StyledTableCell>
                <StyledTableCell>{index.tenPhim}</StyledTableCell>
                <StyledTableCell>
                  <img
                    src={index.hinhAnh}
                    alt={index.tenPhim}
                    width={"80px"}
                    height={"80px"}
                  />
                </StyledTableCell>
                <StyledTableCell>{index.ngayDat}</StyledTableCell>
                <StyledTableCell>{`${index.thoiLuongPhim} phút`}</StyledTableCell>
                <StyledTableCell>{index.giaVe}</StyledTableCell>
                <StyledTableCell>
                  <Box>
                    <IconButton
                      aria-label="update"
                      size="large"
                      onClick={() => {
                        handleOpenSeatList(index.danhSachGhe);
                      }}
                    >
                      <ReorderIcon />
                    </IconButton>
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
                count={infoTicket.length}
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
      <Modal
        open={openSeatList}
        onClose={handleCloseSeatList}
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
            bgcolor: "background.paper",
            border: "1px solid #fff",
            boxShadow: 24,
            p: 4,
          }}
        >
          <SeatListProfile seatList={seatList} />
        </Box>
      </Modal>
    </Box>
  );
}
