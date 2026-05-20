#!/bin/bash
cd /home/ec2-user/aws-backend-api
# Tắt app cũ nếu đang chạy và bật app mới lên bằng PM2 (trình quản lý process cho Node.js)
pm2 stop server || true
pm2 start server.js --name "backend-api"