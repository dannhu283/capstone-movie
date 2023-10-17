import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext/UserContext";

export default function ProtectedRouteAdmin({ children }) {
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
