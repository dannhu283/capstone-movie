import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {
  Fade,
  Backdrop,
  Modal,
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUserContext } from "../../context/UserContext/UserContext";

const pages = ["Lịch Chiếu", "Cụm Rạp", "Tin Tức", "Ứng Dụng"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Header() {
  const { currentUser, handleSignout } = useUserContext();
  //useState MUI
  const [anchorElNav, setAnchorElNav] = useState(null);
  //useState modal
  const [open, setOpen] = React.useState(false);
  const [isLogoutConfirmationOpen, setIsLogoutConfirmationOpen] =
    useState(false);

  //modal info
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //modal log out
  const handleOpenLogoutConfirmation = () => {
    setIsLogoutConfirmationOpen(true);
  };
  const handleCloseLogoutConfirmation = () => {
    setIsLogoutConfirmationOpen(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2f2e2c" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUspkDZ2CKVG0awSKJKPTwzQIGH1yAIr_WVb90Lm_Y2a-sq9O-6B1dFRR_ImOkQ4YJNzs&usqp=CAU"
              width={150}
              alt=""
            />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenNavMenu} // Mở Menu
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  "&:hover": {
                    boxShadow: "0px 20px 30px -10px rgb(38, 57, 77)",
                    fontSize: "12px",
                    color: "#ff9f1a",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {currentUser ? (
            <Box>
              <Button
                sx={{
                  color: "white",
                  "&:hover": {
                    boxShadow: "0px 20px 30px -10px rgb(38, 57, 77)",
                    fontSize: "15px",
                    color: "#ff9f1a",
                  },
                }}
                onClick={handleOpen}
              >
                <AdminPanelSettingsIcon />
                {currentUser.hoTen}
              </Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h5">
                      Cài đặt tài khoản chung
                    </Typography>
                    <Typography variant="p">
                      Thông tin có thể được thay đổi
                    </Typography>

                    <Typography
                      id="transition-modal-description"
                      sx={{ mt: 2 }}
                    >
                      textfield in here
                    </Typography>
                  </Box>
                </Fade>
              </Modal>

              <Button
                onClick={handleOpenLogoutConfirmation}
                sx={{
                  color: "white",
                  "&:hover": {
                    boxShadow: "0px 20px 30px -10px rgb(38, 57, 77)",
                    fontSize: "15px",
                    color: "#ff9f1a",
                  },
                }}
              >
                <LogoutIcon /> Đăng Xuất
              </Button>
              {currentUser && (
                <Dialog
                  open={isLogoutConfirmationOpen}
                  onClose={handleCloseLogoutConfirmation}
                  fullWidth
                  maxWidth="xs"
                >
                  <DialogTitle>Xác nhận đăng xuất</DialogTitle>
                  <DialogContent>
                    <Typography>Bạn có chắc chắn muốn đăng xuất?</Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleCloseLogoutConfirmation}
                      color="primary"
                    >
                      Hủy
                    </Button>
                    <Button onClick={handleSignout} color="primary">
                      Đăng Xuất
                    </Button>
                  </DialogActions>
                </Dialog>
              )}
            </Box>
          ) : (
            <Box>
              <Link to="/sign-in">
                <Button
                  sx={{
                    color: "white",
                    marginRight: "20px",
                    "&:hover": {
                      boxShadow: "0px 20px 30px -10px rgb(38, 57, 77)",
                      fontSize: "15px",
                      color: "#ff9f1a",
                    },
                  }}
                >
                  <PersonPinIcon /> Đăng Nhập
                </Button>
              </Link>

              <Link to="/sign-up">
                <Button
                  sx={{
                    color: "white",
                    "&:hover": {
                      boxShadow: "0px 20px 30px -10px rgb(38, 57, 77)",
                      fontSize: "15px",
                      color: "#ff9f1a",
                    },
                  }}
                >
                  <PersonPinIcon />
                  Đăng Kí
                </Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
