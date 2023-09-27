import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./modules/Home";
import Details from "./modules/Details";
import Signin from "./modules/Auth/pages/Signin";
import Signup from "./modules/Auth/pages/Signup";
import UserProvider from "./context/UserContext/UserContext";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./Components/NotFound";
import ProtectedRoute from "./routers/ProtectedRoute";
import AdminMovie from "./modules/AdminMovie";

import "./indexx.css";
import TicketPage from "./modules/TicketMovie/TicketPage";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* user */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="movies/:movieId" element={<Details />} />

            <Route element={<ProtectedRoute />}>
              <Route path="tickets/:showtimeId" element={<TicketPage />} />
            </Route>

            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
          </Route>

          {/* admin */}
          {/* <Route element={<AdminProtectedRoute />} > */}
          <Route path="/admin">
            <Route path="movies" element={<AdminMovie />} />
            {/* <Route path="users" element={<AdminUser />} />
          <Route path="tikets" element={<AdminTicker />} /> */}
          </Route>
          {/* </Route> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
