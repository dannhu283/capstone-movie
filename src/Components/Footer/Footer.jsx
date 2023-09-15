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
import Styles from "./Styles.module.css";
import data from "../data.json";
import {
  Container,
  Grid,
  Link,
  Typography,
  List,
  ListItem,
} from "@mui/material";

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
            <ListSubheader className={Styles.color}>Giới Thiệu</ListSubheader>
            <List>
              <ListItem>
                <KeyboardDoubleArrowRightIcon className={Styles.icon} />
                <Link href="#" className={Styles.link}>
                  Về chúng tôi
                </Link>
              </ListItem>
              <ListItem>
                <KeyboardDoubleArrowRightIcon className={Styles.icon} />
                <Link href="#" className={Styles.link}>
                  Thoả thuận sử dụng
                </Link>
              </ListItem>
              <ListItem>
                <KeyboardDoubleArrowRightIcon className={Styles.icon} />
                <Link href="#" className={Styles.link}>
                  Quy chế hoạt động
                </Link>
              </ListItem>
              <ListItem>
                <KeyboardDoubleArrowRightIcon className={Styles.icon} />
                <Link href="#" className={Styles.link}>
                  Chính sách bảo mật
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <ListSubheader className={Styles.color}>Góc Điện Ảnh</ListSubheader>
            <List>
              <ListItem>
                <KeyboardDoubleArrowRightIcon className={Styles.icon} />
                <Link href="#" className={Styles.link}>
                  Thể loại phim
                </Link>
              </ListItem>
              <ListItem>
                <KeyboardDoubleArrowRightIcon className={Styles.icon} />
                <Link href="#" className={Styles.link}>
                  Bình luận phim
                </Link>
              </ListItem>
              <ListItem>
                <KeyboardDoubleArrowRightIcon className={Styles.icon} />
                <Link href="#" className={Styles.link}>
                  Blog điện ảnh
                </Link>
              </ListItem>
              <ListItem>
                <KeyboardDoubleArrowRightIcon className={Styles.icon} />
                <Link href="#" className={Styles.link}>
                  Phim hay tháng
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <ListSubheader className={Styles.color}>Hỗ Trợ</ListSubheader>
            <List>
              <ListItem>
                <KeyboardDoubleArrowRightIcon className={Styles.icon} />
                <Link href="#" className={Styles.link}>
                  Góp ý
                </Link>
              </ListItem>
              <ListItem>
                <KeyboardDoubleArrowRightIcon className={Styles.icon} />
                <Link href="#" className={Styles.link}>
                  Sale & Services
                </Link>
              </ListItem>
              <ListItem>
                <KeyboardDoubleArrowRightIcon className={Styles.icon} />
                <Link href="#" className={Styles.link}>
                  Rạp / giá vé
                </Link>
              </ListItem>
              <ListItem>
                <KeyboardDoubleArrowRightIcon className={Styles.icon} />
                <Link href="#" className={Styles.link}>
                  Tuyển dụng
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <ListSubheader className={Styles.color}>
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
