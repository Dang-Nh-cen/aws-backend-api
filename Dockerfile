# 1. Chọn hệ điều hành nền: Dùng bản 'alpine' siêu nhẹ để tiết kiệm RAM cho máy Mac
FROM public.ecr.aws/docker/library/node:18-alpine

# 2. Tạo thư mục làm việc bên trong Container
WORKDIR /usr/src/app

# 3. Copy file cấu hình package.json vào trước để cài đặt thư viện
COPY package*.json ./

# 4. Cài đặt các thư viện Node.js (chỉ cài những thư viện thực sự cần thiết)
RUN npm install --production

# 5. Copy toàn bộ mã nguồn còn lại từ máy Mac vào Container
COPY . .

# 6. Mở cổng 3000 để Load Balancer có thể giao tiếp
EXPOSE 3000

# 7. Khởi động ứng dụng (Trong Docker, ta chạy Node thuần, không cần PM2 nữa)
CMD ["node", "server.js"]
