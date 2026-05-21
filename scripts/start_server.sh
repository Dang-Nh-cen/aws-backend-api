#!/bin/bash
# Nạp biến môi trường để đảm bảo CodeDeploy nhận diện được node và pm2
source /etc/profile

cd /home/ec2-user/aws-backend-api

# Đảm bảo pm2 đã được cài đặt
npm install -g pm2

# Dọn dẹp tuyệt đối mọi tiến trình cũ (kể cả tiến trình do Launch Template V5 mồi)
pm2 stop all || true
pm2 delete all || true

# Khởi động ứng dụng với cờ -f (force) để ép buộc chạy code mới
pm2 start server.js --name "backend-api" -f
pm2 save