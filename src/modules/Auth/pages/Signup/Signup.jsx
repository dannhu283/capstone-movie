import React from "react";
import { useForm } from "react-hook-form";

export default function Signup() {
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

    // Gọi API đăng ký
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
            placeholder="Tài Khoản"
            {...register("taiKhoan", {
              required: {
                value: true,
                message: "Tài khoản không được để trống",
              },
            })}
          />
          {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
        </div>
        <div>
          <input
            placeholder="Mật khẩu"
            {...register("matKhau", {
              required: {
                value: true,
                message: "Mật khẩu không được để trống",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                message:
                  "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số",
              },
            })}
          />
          {errors.matKhau && <p>{errors.matKhau.message}</p>}
        </div>
        <div>
          <input placeholder="Email" {...register("email")} />
        </div>
        <div>
          <input placeholder="Họ Tên" {...register("hoTen")} />
        </div>
        <div>
          <input placeholder="Số Điện Thoại" {...register("soDt")} />
        </div>

        <button type="submit">Đăng Ký</button>
      </form>
    </div>
  );
}


// MUI
{
  /* <TextField
  {...register("taiKhoan", { require: { value: true, message: "lỗi" } })}
  error={!!errors.taiKhoan}
  helperText={errors.taiKhoan.message}
/>; */
}
