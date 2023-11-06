import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Container, Grid, Box, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import news from "../../../Components/news.json";
import { ButtonMain } from "../../../Components/ButtonMain";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function New() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let display = "none";
  if (open) {
    display = "block";
  }
  const handleChangeButton = () => {
    setOpen(!open);
  };

  return (
    <Container id="tintuc">
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label="Điện ảnh 24h"
              {...a11yProps(0)}
              sx={{ color: "#ff9f1a", fontWeight: "bold" }}
            />
            <Tab
              label="Review"
              {...a11yProps(1)}
              sx={{ color: "#ff9f1a", fontWeight: "bold" }}
            />
            <Tab
              label="Khuyến Mãi"
              {...a11yProps(2)}
              sx={{ color: "#ff9f1a", fontWeight: "bold" }}
            />
          </Tabs>
        </Box>
        <Box sx={{ display: display }}>
          <CustomTabPanel value={value} index={0}>
            <Grid container spacing={2}>
              {/* row1 */}
              {news[0].dienAnh?.slice(0, 2).map((item) => (
                <Grid item xs={12} sm={6} key={item.id}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="250"
                      image={item.img}
                      alt="#"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Grid>
              ))}
              {/* row2 */}
              {news[0].dienAnh?.slice(2, 4).map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.img}
                      alt="#"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Grid>
              ))}
              {/* col3 */}
              <Grid
                item
                md={4}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                {news[0].dienAnh?.slice(4).map((item) => (
                  <Grid item md={12} key={item.id} marginBottom={1}>
                    <CardActionArea
                      sx={{ display: "flex", justifyContent: "start" }}
                    >
                      <Box sx={{ display: "flex" }}>
                        <CardMedia
                          component="img"
                          sx={{ width: 60 }}
                          image={item.img}
                          alt="#"
                        />
                        <CardContent>
                          <Typography sx={{ fontSize: "14px" }}>
                            {item.title}
                          </Typography>
                        </CardContent>
                      </Box>
                    </CardActionArea>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Grid container spacing={2}>
              {/* row1 */}
              {news[0].review?.slice(0, 2).map((item) => (
                <Grid item xs={12} sm={6} key={item.id}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="250"
                      image={item.img}
                      alt="#"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Grid>
              ))}
              {/* row2 */}
              {news[0].review?.slice(2, 4).map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.img}
                      alt="#"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Grid>
              ))}
              {/* col3 */}
              <Grid
                item
                md={4}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                {news[0].review?.slice(4).map((item) => (
                  <Grid item xs={12} key={item.id} marginBottom={1}>
                    <CardActionArea
                      sx={{ display: "flex", justifyContent: "start" }}
                    >
                      <Box sx={{ display: "flex" }}>
                        <CardMedia
                          component="img"
                          sx={{ width: 60 }}
                          image={item.img}
                          alt="#"
                        />
                        <CardContent>
                          <Typography sx={{ fontSize: "14px" }}>
                            {item.title}
                          </Typography>
                        </CardContent>
                      </Box>
                    </CardActionArea>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Grid container spacing={2}>
              {/* row1 */}
              {news[0].khuyenMai?.slice(0, 2).map((item) => (
                <Grid item xs={12} sm={6} key={item.id}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="250"
                      image={item.img}
                      alt="#"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Grid>
              ))}
              {/* row2 */}
              {news[0].khuyenMai?.slice(2, 4).map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.img}
                      alt="#"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Grid>
              ))}
              {/* col3 */}
              <Grid
                item
                md={4}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                {news[0].khuyenMai?.slice(4).map((item) => (
                  <Grid item md={12} key={item.id} marginBottom={1}>
                    <CardActionArea
                      sx={{ display: "flex", justifyContent: "start" }}
                    >
                      <Box sx={{ display: "flex" }}>
                        <CardMedia
                          component="img"
                          sx={{ width: 60 }}
                          image={item.img}
                          alt="#"
                        />
                        <CardContent>
                          <Typography sx={{ fontSize: "14px" }}>
                            {item.title}
                          </Typography>
                        </CardContent>
                      </Box>
                    </CardActionArea>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </CustomTabPanel>
        </Box>
      </Box>
      <ButtonMain style={{ margin: "5% 45%" }} onClick={handleChangeButton}>
        {open ? "Rút gọn" : "Xem thêm"}
      </ButtonMain>
    </Container>
  );
}
