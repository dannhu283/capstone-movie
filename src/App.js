import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./modules/Home";
import Details from "./modules/Details";
import NotFound from "./Components/NotFound/NotFound";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Singin from "./modules/Auth/pages/Signin/Singin";
import Signup from "./modules/Auth/pages/Signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="movies/:movieId" element={<Details />} />
          <Route path="sign-in" element={<Singin />} />
          <Route path="Sign-up" element={<Signup />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
