import React from "react";
import { useForm } from "react-hook-form";

export default function Sinup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDt: "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);

    //gọi API đăng kí
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div>
          <input
            placeholder="tài khoản"
            {...register("taiKhoan", {
              required: {
                value: true,
                message: "Tài Khoản không được để trống",
              },
            })}
          />
          {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
        </div>
        <div>
          <input
            placeholder="Mật khẩu"
            {...register("matKhau", {
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8}$/,
                message:
                  "Mật khẩu ít nhất có 8 kí tự ,1 kí tự hoa,1 kí tự thường và 1 số ",
              },
              required: {
                value: true,
                message: "Mật khẩu không được để trống",
              },
            })}
          />
          {errors.matKhau && <p>{errors.matKhau.message}</p>}
        </div>
        <div>
          <input placeholder="Email" {...register("email")} />
        </div>
        <div>
          <input placeholder="Họ tên" {...register("hoTen")} />
        </div>
        <div>
          <input placeholder="Số điện thoại" {...register("soDt")} />
        </div>
        <button type="submit">Đăng kí</button>
      </form>
    </div>
  );
}
