import React from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addMovie } from "../../../../APIs/movieAPI";
import { useEffect } from "react";
import { useState } from "react";

export default function AddMovie() {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      hinhAnh: "",
      trailer: "",
      ngayKhoiChieu: "",
    },
  });

  const hinhAnh = watch("hinhAnh");
  const [imgPreview, setImgPreview] = useState("");
  useEffect(() => {
    // Chạy vào useEffect callback khi giá trị của hinhAnh bị thay đổi
    const file = hinhAnh?.[0];
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      setImgPreview(event.target.result);
    };
  }, [hinhAnh]);

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      const formData = new FormData();
      formData.append("tenPhim", values.tenPhim);
      formData.append("biDanh", values.biDanh);
      formData.append("moTa", values.moTa);
      formData.append("hinhAnh", values.hinhAnh[0]);
      formData.append("trailer", values.trailer);
      formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
      formData.append("maNhom", "GP01");

      return addMovie(formData);
    },
    onSuccess: () => {
      // Đóng modal hoặc chuyển trang
      // Sử dụng queryClient.invalidateQueries để gọi lại API get danh sách phim
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input type="text" placeholder="Tên phim" {...register("tenPhim")} />
      </div>
      <div>
        <input type="text" placeholder="Bí danh" {...register("biDanh")} />
      </div>
      <div>
        <input type="text" placeholder="Mô tả" {...register("moTa")} />
      </div>
      <div>
        <input type="file" placeholder="Hình ảnh" {...register("hinhAnh")} />
        {imgPreview && (
          <div>
            <img src={imgPreview} alt="preview" width={200} height={200} />
          </div>
        )}
      </div>
      <div>
        <input type="text" placeholder="Trailer" {...register("trailer")} />
      </div>
      <div>
        <input
          type="date"
          placeholder="Ngày khởi chiếu"
          {...register("ngayKhoiChieu", {
            setValueAs: (values) => {
              return dayjs(values).format("DD/MM/YYYY");
            },
          })}
        />
      </div>
      <button type="submit">Thêm Phim</button>
    </form>
  );
}
