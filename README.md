# cấu trúc project

src
 -Components/:
    -Chứa các component thuần về UI được tái sử dụng ở nhiều nơi ( VD:Button,Card,Input,Header,Footer,SideBar,...)
    -Các component này thường không bao gồm logic của ứng dụng,chỉ nhận vào props hay state của riêng nó để xử lí dữ liệu (không bao gồm call Api,...)

 -modules/module-name:
    -Chứa các component cấu thành 1 trang hoặc 1 chức năng cụ thể 

 -Layouts/:
   -Chứa các component layout cho react-router

 -APIs/:
   -setup thư viện gọi API
   -setup hàm gọi API