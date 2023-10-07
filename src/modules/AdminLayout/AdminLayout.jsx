import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import DrawerAdmin from "../AdminComponents/DrawlerAdmin";
export default function AdminLayout() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <DrawerAdmin />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
