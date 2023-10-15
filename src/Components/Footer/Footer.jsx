import * as React from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { LiFooter } from "./index";
import data from "../data.json";

import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  Box,
  Divider,
  ListItemButton,
} from "@mui/material";

export default function Footer() {
  return (
    <Box
      variant="solid"
      sx={{
        flexGrow: 1,
        p: 2,
        backgroundColor: "#2f2e2c",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          {/* cho nao khong an css em? */}
          <Typography
            sx={{ fontSize: "20px", color: "#ff9f1a", fontWeight: "bold" }}
          >
            Đối Tác Của Chúng Tôi
          </Typography>
          <Grid container spacing={2}>
            {data.map((cinema) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={cinema.biDanh}>
                <IconButton variant="plain">
                  <div>
                    <a href={cinema.link} target="_blank" rel="noreferrer">
                      <img src={cinema.logo} alt="..." width={40} />
                    </a>
                  </div>
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Typography sx={{ color: "#ff9f1a" }} p={"0 16px"}>
              Giới Thiệu
            </Typography>
            <List>
              <ListItem>
                <KeyboardDoubleArrowRightIcon sx={{ color: "#ff9f1a" }} />
                <LiFooter href="#">Về chúng tôi</LiFooter>
              </ListItem>
              <ListItem>
                <KeyboardDoubleArrowRightIcon sx={{ color: "#ff9f1a" }} />
                <LiFooter href="#">Thoả thuận sử dụng</LiFooter>
              </ListItem>
              <ListItem>
                <KeyboardDoubleArrowRightIcon sx={{ color: "#ff9f1a" }} />
                <LiFooter href="#">Quy chế hoạt động</LiFooter>
              </ListItem>
              <ListItem>
                <KeyboardDoubleArrowRightIcon sx={{ color: "#ff9f1a" }} />
                <LiFooter href="#">Chính sách bảo mật</LiFooter>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Typography sx={{ color: "#ff9f1a" }} p={"0 16px"}>
              Góc Điện Ảnh
            </Typography>
            <List>
              <ListItem>
                <KeyboardDoubleArrowRightIcon sx={{ color: "#ff9f1a" }} />
                <LiFooter href="#">Thể loại phim</LiFooter>
              </ListItem>
              <ListItem>
                <KeyboardDoubleArrowRightIcon sx={{ color: "#ff9f1a" }} />
                <LiFooter href="#">Bình luận phim</LiFooter>
              </ListItem>
              <ListItem>
                <KeyboardDoubleArrowRightIcon sx={{ color: "#ff9f1a" }} />
                <LiFooter href="#">Blog điện ảnh</LiFooter>
              </ListItem>
              <ListItem>
                <KeyboardDoubleArrowRightIcon sx={{ color: "#ff9f1a" }} />
                <LiFooter href="#">Phim hay tháng</LiFooter>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Typography sx={{ color: "#ff9f1a" }} p={"0 16px"}>
              Hỗ Trợ
            </Typography>
            <List>
              <ListItem>
                <KeyboardDoubleArrowRightIcon sx={{ color: "#ff9f1a" }} />
                <LiFooter href="#">Góp ý</LiFooter>
              </ListItem>
              <ListItem>
                <KeyboardDoubleArrowRightIcon sx={{ color: "#ff9f1a" }} />
                <LiFooter href="#">Sale & Services</LiFooter>
              </ListItem>
              <ListItem>
                <KeyboardDoubleArrowRightIcon sx={{ color: "#ff9f1a" }} />
                <LiFooter href="#">Rạp / giá vé</LiFooter>
              </ListItem>
              <ListItem>
                <KeyboardDoubleArrowRightIcon sx={{ color: "#ff9f1a" }} />
                <LiFooter href="#">Tuyển dụng</LiFooter>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Typography sx={{ color: "#ff9f1a" }} p={"0 16px"}>
              Liên hệ với chúng tôi
            </Typography>
            <List
              size="sm"
              orientation="horizontal"
              // sx={{ flexGrow: 0, "--ListItem-radius": "8px" }}
            >
              <ListItem>
                <ListItemButton
                  sx={{
                    transition: "all .5s",
                    "&:hover": { color: "#ff9f1a" },
                  }}
                >
                  <FacebookIcon sx={{ fontSize: "25px", marginRight: "8px" }} />
                  FaceBook
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  sx={{
                    transition: "all .5s",
                    "&:hover": { color: "#ff9f1a" },
                  }}
                >
                  <GitHubIcon sx={{ fontSize: "25px", marginRight: "8px" }} />
                  Github
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  sx={{
                    transition: "all .5s",
                    "&:hover": { color: "#ff9f1a" },
                  }}
                >
                  <YouTubeIcon sx={{ fontSize: "25px", marginRight: "8px" }} />
                  Youtube
                </ListItemButton>
              </ListItem>
              {/* <ListItem>
                <List sx={{ "--ListItemDecorator-size": "32px", padding: "0" }}>

                  
                  
                </List>
              </ListItem> */}
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
