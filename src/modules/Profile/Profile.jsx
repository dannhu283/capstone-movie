import { Box, Container, Tab, Tabs } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Account from "./Account";
import HistoryTicket from "./HistoryTicket/HistoryTicket";
import { useQuery } from "@tanstack/react-query";
import { getInfoUser } from "../../APIs/userAPI";
import Loading from "../../Components/Loading";
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

export default function Profile() {
  const [tabBar, setTabBar] = React.useState(0);

  const { username } = useParams();

  const { data: profile = [], isLoading } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => getInfoUser(username),
    enabled: !!username,
  });

  const infoTicket = profile?.thongTinDatVe || undefined;
  const handleChangeTabBar = (event, newValue) => {
    setTabBar(newValue);
  };

  if (isLoading) return <Loading />;

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#f6f9fc",
        paddingTop: "64px",
      }}
    >
      <Container>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            marginTop: "24px",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabBar}
                onChange={handleChangeTabBar}
                aria-label="basic tabs example"
                centered={true}
                variant="fullWidth"
              >
                <Tab
                  sx={{ width: "100%" }}
                  label="Thông tin cá nhân"
                  {...a11yProps(0)}
                />
                <Tab label="Lịch sử đặt vé" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={tabBar} index={0}>
              <Account username={username} />
            </CustomTabPanel>
            <CustomTabPanel value={tabBar} index={1}>
              <HistoryTicket infoTicket={infoTicket} />
            </CustomTabPanel>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
