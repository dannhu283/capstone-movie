import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { AccountCircle, ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { SigninAndSignup } from "./index";
import { useUserContext } from "../../context/UserContext/UserContext";
import PropTypes from "prop-types";
import { ModalSuccess, ModalContent } from "../Modal";
import { ButtonMain, ButtonCustom } from "../ButtonMain";

function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,

  window: PropTypes.func,
};

export default function Header(props) {
  const pages = [
    { id: "showing", label: "Lịch chiếu" },
    { id: "cinema", label: "Cụm rạp" },
    { id: "tintuc", label: "Tin tức" },
    { id: "ungdung", label: "Ứng dụng" },
  ];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();
  const { currentUser, handleSignout } = useUserContext();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    navigate(`/`);

    // Check if the element exists before scrolling
    const element = document.getElementById(`${page.id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === "Logout") {
      handleLogout();
    } else if (setting === "Profile") {
      navigate(`/profile/${currentUser.taiKhoan}`);
    }
  };

  const handleLogout = () => {
    setShowSuccessModal(true);
  };

  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar sx={{ backgroundColor: "#2f2e2c" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <img
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUspkDZ2CKVG0awSKJKPTwzQIGH1yAIr_WVb90Lm_Y2a-sq9O-6B1dFRR_ImOkQ4YJNzs&usqp=CAU"
                width={150}
                alt=""
              />

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
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
                    <MenuItem
                      key={page.id}
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <Typography>{page.label}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                }}
                justifyContent="center"
              >
                {pages.map((page) => (
                  <Button
                    key={page.id}
                    onClick={() => handleCloseNavMenu(page)}
                    sx={{
                      my: 2,
                      margin: "0 10px",
                      color: "white",
                      display: "block",
                      "&:hover": {
                        boxShadow: "0px 20px 30px -10px rgb(38, 57, 77)",
                        fontSize: "12px",
                        color: "#ff9f1a",
                      },
                    }}
                  >
                    {page.label}
                  </Button>
                ))}
              </Box>

              {/* Account */}
              {currentUser ? (
                <>
                  <Box
                    sx={{ flexGrow: 0, borderRight: 1, pr: 2 }}
                    display={"inline-block"}
                  >
                    <Tooltip title="User">
                      <IconButton
                        onClick={handleOpenUserMenu}
                        sx={{
                          color: "white",
                          p: 0,
                          "&:hover": {
                            color: "#ff9f1a",
                          },
                        }}
                      >
                        <AccountCircle fontSize="large" />
                        <Typography>{currentUser.hoTen}</Typography>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem
                          key={setting}
                          onClick={() => handleCloseUserMenu(setting)}
                        >
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>

                  <IconButton
                    sx={{
                      color: "white",
                      "&:hover": {
                        color: "#ff9f1a",
                      },
                    }}
                    onClick={handleLogout}
                  >
                    <ExitToApp />
                    <Typography>Đăng xuất</Typography>
                  </IconButton>
                </>
              ) : (
                <>
                  {/* Signin */}
                  <Box sx={{ flexGrow: 0 }}>
                    <SigninAndSignup
                      onClick={() => navigate(`/sign-in`)}
                      borderRight="1px solid #9e9e9e"
                    >
                      <Tooltip title="Đăng nhập">
                        <AccountCircle fontSize="large" />
                      </Tooltip>
                      <Typography>Đăng nhập</Typography>
                    </SigninAndSignup>
                  </Box>

                  {/* Signup */}
                  <Box sx={{ flexGrow: 0 }}>
                    <SigninAndSignup onClick={() => navigate(`/sign-up`)}>
                      <Tooltip title="Đăng kí">
                        <AccountCircle fontSize="large" />
                      </Tooltip>
                      <Typography>Đăng kí</Typography>
                    </SigninAndSignup>
                  </Box>
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      {showSuccessModal && (
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
              Bạn có chắc chắn đăng xuất?
            </Typography>

            <ButtonMain onClick={handleSignout}>Đồng ý</ButtonMain>
            <ButtonCustom onClick={() => setShowSuccessModal(false)}>
              Hủy Bỏ
            </ButtonCustom>
          </ModalContent>
        </ModalSuccess>
      )}
    </>
  );
}
