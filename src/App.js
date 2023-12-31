import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./modules/Home";
import Details from "./modules/Details";
import Signin from "./modules/Auth/pages/Signin";
import Signup from "./modules/Auth/pages/Signup";
import UserProvider from "./context/UserContext/UserContext";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./Components/NotFound";
import ProtectedRoute from "./routers/ProtectedRoute";
import AdminLayout from "./modules/AdminLayout";
import "./indexx.css";
import TicketMovie from "./modules/TicketMovie/TicketMovie";
import AddMovie from "./modules/AdminLayout/Movie/AddMovie";
import MovieManagement from "./modules/AdminLayout/Movie/MovieManagement";
import UserManagement from "./modules/AdminLayout/User/UserManagement";
import CreateShowtimes from "./modules/AdminLayout/Movie/CreateShowtimes";
import EditMovie from "./modules/AdminLayout/Movie/EditMovie";
import Profile from "./modules/Profile";
import TicketProvider from "./context/TicketContext/TicketContext";
import ProtectedRouteAdmin from "./routers/ProtectedRouteAdmin/ProtectedRouteAdmin";

function App() {
  return (
    <UserProvider>
      <TicketProvider>
        <BrowserRouter>
          <Routes>
            {/* user */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="movies/:movieId" element={<Details />} />

              <Route path="/sign-in" element={<Signin />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route element={<ProtectedRoute />}>
                <Route path="profile/:username" element={<Profile />} />
                <Route path="tickets/:showtimeId" element={<TicketMovie />} />
              </Route>
            </Route>

            {/* admin */}
            <Route element={<ProtectedRouteAdmin />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="addmovie" element={<AddMovie />} />

                <Route path="moviemanagement" element={<MovieManagement />} />

                <Route path="editmovie/:movieId" element={<EditMovie />} />

                <Route path="showtime/:movieId" element={<CreateShowtimes />} />

                <Route path="usermanagement" element={<UserManagement />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TicketProvider>
    </UserProvider>
  );
}

export default App;
