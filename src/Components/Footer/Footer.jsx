import * as React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Divider from "@mui/joy/Divider";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItemButton from "@mui/joy/ListItemButton";
import Sheet from "@mui/joy/Sheet";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { LiFooter } from "./index";
import data from "../data.json";

import { Container, Grid, Typography, List, ListItem } from "@mui/material";

export default function Footer() {
  return (
    <Sheet
      variant="solid"
      invertedColors
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
            {data.map((item) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={item.biDanh}>
                <IconButton variant="plain">
                  <div>
                    <a href={item.link} target="_blank" rel="noreferrer">
                      <img src={item.logo} alt="" width={40} />
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
            <ListSubheader sx={{ color: "#ff9f1a" }}>Giới Thiệu</ListSubheader>
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
            <ListSubheader sx={{ color: "#ff9f1a" }}>
              Góc Điện Ảnh
            </ListSubheader>
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
            <ListSubheader sx={{ color: "#ff9f1a" }}>Hỗ Trợ</ListSubheader>
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
            <ListSubheader sx={{ color: "#ff9f1a" }}>
              Liên hệ với chúng tôi
            </ListSubheader>
            <List
              size="sm"
              orientation="horizontal"
              wrap
              sx={{ flexGrow: 0, "--ListItem-radius": "8px" }}
            >
              <ListItem>
                <List sx={{ "--ListItemDecorator-size": "32px" }}>
                  <ListItem>
                    <ListItemButton>
                      <FacebookIcon sx={{ m: "10px", fontSize: "25px" }} />
                      FaceBook
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>
                      <GitHubIcon sx={{ m: "10px", fontSize: "25px" }} />
                      Github
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>
                      <YouTubeIcon sx={{ m: "10px", fontSize: "25px" }} />
                      Youtube
                    </ListItemButton>
                  </ListItem>
                </List>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </Sheet>
  );
}
