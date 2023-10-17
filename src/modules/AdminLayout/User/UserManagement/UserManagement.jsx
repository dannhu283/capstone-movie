import React from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCustomer } from "../../../../APIs/customerAPI";
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
import { StyledTableCell, StyledTableRow } from "./styledTable";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../../../../Components/Loading";
import UserModal from "./UpdateUser";
import { getInfoUser, removeUser } from "../../../../APIs/userAPI";
import AddUser from "./AddUser/AddUser";
import SearchIcon from "@mui/icons-material/Search";
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [openAddUser, setOpenAddUser] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [infoUser, setInfoUser] = React.useState({});
  const [isLoadingInfoUser, setIsLoadingInfoUser] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState([]);

  const queryClient = useQueryClient();

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["customer"],
    queryFn: getCustomer,
  });

  const { mutate: handleDeleteUser, error } = useMutation({
    mutationFn: (username) => removeUser(username),
    onSuccess: () => {
      setOpenSuccess(true);
      setOpenError(false);
      queryClient.invalidateQueries({ queryKey: ["customer"] });
    },
  });

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customers.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = (username) => {
    setUserName(username);
    setIsLoadingInfoUser(true); // Bắt đầu tải dữ liệu
    setOpen(true);
  };

  const handleClose = () => {
    setUserName("");
    setOpen(false);
    setOpenBackdrop(false);
  };

  const handleOpenAddUser = () => {
    setOpenAddUser(true);
  };

  const handleCloseAddUser = () => {
    setOpenAddUser(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteAndReload = () => {
    if (!error) {
      handleDeleteUser(selectedUser);
    } else {
      setOpenError(true);
      setOpenDelete(false);
    }
  };

  const handleCloseError = () => {
    setOpenError(false);
    setOpenDelete(false);
    window.location.reload(); // Reload the page if there's an error
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  // Function to filter users based on search query
  const filterUsers = () => {
    const filteredData = customers.filter((customer) =>
      customer.taiKhoan.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };

  const handleSearch = () => {
    filterUsers();
  };

  // Attach an event handler to update searchQuery when the input value changes
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Sự kiện xử lý khi nhấn phím "Enter" trong trường đầu vào tìm kiếm
  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      filterUsers();
    }
  };

  React.useEffect(() => {
    if (userName) {
      setIsLoadingInfoUser(true);
      setOpenBackdrop(true);
      // Gọi API để lấy infoUser khi userName đã có giá trị
      getInfoUser(userName).then((data) => {
        setInfoUser(data);
        setIsLoadingInfoUser(false); // Dừng trạng thái tải
      });
    }
  }, [userName]);

  React.useEffect(() => {
    if (customers) {
      //  setInitialData(customers);
      setFilteredUsers(customers); // Ban đầu, filteredUsers bằng danh sách customers
    }
  }, [customers]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Box height={100} />
      <Box display={"flex"} justifyContent={"right"} mb={2}>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginRight: "16px",
            display: "flex",
          }}
        >
          <TextField
            fullWidth
            label="Tìm kiếm tài khoản"
            id="fullWidth"
            color="secondary"
            value={searchQuery}
            onChange={handleSearchInputChange} // Handle input change
            onKeyDown={handleEnterKeyDown}
          />
          <Button variant="contained" color="info" onClick={handleSearch}>
            <SearchIcon />
          </Button>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenAddUser}
        >
          Thêm người dùng
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Tài khoản
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Mật khẩu
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Email
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Họ tên
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Số điện thoại
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Mã người dùng
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Chức năng
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredUsers.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredUsers
            ).map((customer) => (
              <StyledTableRow key={customer.taiKhoan}>
                <StyledTableCell>{customer.taiKhoan}</StyledTableCell>
                <StyledTableCell>{customer.matKhau}</StyledTableCell>
                <StyledTableCell>{customer.email}</StyledTableCell>
                <StyledTableCell>{customer.hoTen}</StyledTableCell>
                <StyledTableCell>{customer.soDT}</StyledTableCell>
                <StyledTableCell>{customer.maLoaiNguoiDung}</StyledTableCell>
                <StyledTableCell>
                  <Box>
                    <IconButton
                      aria-label="update"
                      size="large"
                      onClick={() => {
                        handleOpen(customer.taiKhoan);
                      }}
                    >
                      <EditIcon fontSize="inherit" color="primary" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => {
                        setOpenDelete(true);
                        setSelectedUser(customer.taiKhoan);
                      }}
                    >
                      <DeleteIcon fontSize="inherit" color="error" />
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
                count={customers.length}
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

      {/* Modal update user */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isLoadingInfoUser ? (
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={openBackdrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop> // Hiển thị trạng thái tải
        ) : (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 1000,
              height: 400,
              bgcolor: "background.paper",
              border: "1px solid #fff",
              boxShadow: 24,
              p: 4,
            }}
          >
            {/* Hiển thị form hoặc nội dung modal */}
            <UserModal infoUser={infoUser} onClose={handleClose} />
          </Box>
        )}
      </Modal>

      {/* Modal add user */}
      <Modal
        open={openAddUser}
        onClose={handleCloseAddUser}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1000,
            height: 400,
            bgcolor: "background.paper",
            border: "1px solid #fff",
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Hiển thị form hoặc nội dung modal */}
          <AddUser onClose={handleCloseAddUser} />
        </Box>
      </Modal>

      {/* Modal hiển thị thông báo xác nhận xóa */}
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "1px solid #fff",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bạn có muốn xóa tài khoản {selectedUser} ?
          </Typography>
          <Box display={"flex"} justifyContent={"right"} m={2}>
            <Button
              variant="contained"
              color="success"
              sx={{ marginRight: "10px" }}
              onClick={handleDeleteAndReload}
            >
              Xác nhận
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setOpenDelete(false);
              }}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Hiện thông báo lỗi */}

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
          <img
            style={{ width: "80px", marginTop: "10px" }}
            src="/img/animation_error_small.gif"
            alt="confirm"
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {error}
          </Typography>
        </Box>
      </Modal>

      {/* Hiện thông báo xóa user thành công  */}
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
          <Box display={"flex"} justifyContent={"center"}>
            <img
              style={{ width: "80px", marginTop: "10px" }}
              src="/img/animation_lnfs5c14_small.gif"
              alt="confirm"
            />
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Xóa người dùng thành công
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
