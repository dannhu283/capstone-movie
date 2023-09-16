import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
const pages = ["Lịch Chiếu", "Cụm Rạp", "Tin Tức", "Ứng Dụng"];

export default function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

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
          <Box>
            <Link to="/sign-in">
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
