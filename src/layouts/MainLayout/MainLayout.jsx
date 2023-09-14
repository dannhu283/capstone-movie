import React from "react";

import { Outlet, Link } from "react-router-dom";

import Header from "../../Components/Header";

export default function MainLayout() {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
}
