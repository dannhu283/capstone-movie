import React from "react";

import { useQuery } from "@tanstack/react-query";
import { getBanners } from "../../../APIs/movieAPI";

export default function Banner() {
  const {
    data: banners = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["banners"], queryFn: getBanners });

  if (isLoading) {
    // return <Loading />;
    return <h1>Loading</h1>;
  }
  return (
    <div>
      {banners.map((banner) => {
        return (
          <img key={banner.maBanner} width={400} src={banner.hinhAnh} alt="" />
        );
      })}
    </div>
  );
}
