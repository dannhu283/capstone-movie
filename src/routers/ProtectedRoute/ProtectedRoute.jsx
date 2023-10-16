import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext/UserContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useUserContext();
  const location = useLocation();

  if (!currentUser) {
    //user chưa đăng nhập=> redirect về login
    const url = `/sign-in?redirectTo=${location.pathname}`;
    return <Navigate to={url} replace />;
  }

  if (currentUser?.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="/404" replace />;
  }

  return children || <Outlet />;
}

/*
Th1:
<Route path="..."/ element={<ProtectedRoute>
    <PageComponent/>
    </ProtectedRoute>}/>

Th2:
<Route element={Protected/>}>
    <Route path=".." element={<Component/>}/>
    //Định nghĩa các Route khác muốn được protect
</Route>
*/
