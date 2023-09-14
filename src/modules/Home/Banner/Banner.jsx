import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getBanners } from "../../../apis/movieAPI";

export default function Banner() {
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
  });

  if (isLoading) {
    // return <Loading />f
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {banners.map((banner) => {
        return (
          <img key={banner.maBanner} width={300} src={banner.hinhAnh} alt="" />
        );
      })}
    </div>
  );
}
