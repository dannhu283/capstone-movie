import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addMovie } from "../../../APIs/movieAPI";
import dayjs from "dayjs";

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

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("tenPhim", values.tenPhim);
      formData.append("biDanh", values.biDanh);
      formData.append("moTa", values.moTa);
      formData.append("hinhAnh", values.hinhAnh[0]);
      formData.append("trailer", values.trailer);
      formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
      formData.append("maNhom", "GP09");

      return addMovie(formData);
    },
    onSuccess: () => {
      // đóng modal hoặc chuyển trang
      // sử dụng queryClient.invalidateQueries để gọi lại API get danh sách phim
    },
  });

  //display img when upload img
  const hinhAnh = watch("hinhAnh");
  const [imgPreview, setImgPreview] = useState("");

  useEffect(() => {
    const file = hinhAnh?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = (evt) => {
      setImgPreview(evt.target.result);
    };
  }, [hinhAnh]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input placeholder="Tên Phim" {...register("tenPhim")} />
      </div>
      <div>
        <input placeholder="Bí danh" {...register("biDanh")} />
      </div>
      <div>
        <input placeholder="Mô tả" {...register("moTa")} />
      </div>
      <div>
        {/* evt.target.value */}
        <input type="file" placeholder="Hình ảnh" {...register("hinhAnh")} />
        {imgPreview && (
          <div>
            <img src={imgPreview} alt="imgPreview" width={100} height={100} />
          </div>
        )}
      </div>
      <div>
        <input placeholder="trailer" {...register("trailer")} />
      </div>
      <div>
        <input
          type="date"
          placeholder="Ngày khởi chiếu"
          {...register("ngayKhoiChieu", {
            setValueAs: (value) => {
              return dayjs(value).format("DD/MM/YYYY");
            },
          })}
        />
      </div>
      <button>Thêm Phim</button>
    </form>
  );
}
