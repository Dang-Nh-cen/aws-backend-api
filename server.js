const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize, Task } = require('./database');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
// API 1: Health Check (Load Balancer sẽ gọi API này ở Tuần 4)
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Backend Node.js đang chạy tốt!' });
});

// API 2: Tạo Task mới (Test ghi vào RDS)
app.post('/api/tasks', async (req, res) => {
    try {
        const task = await Task.create({ title: req.body.title });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API 3: Lấy danh sách Task (Test đọc từ RDS)
app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
});

const PORT = process.env.PORT || 3000;

// Kết nối DB và chạy Server
sequelize.sync({ force: false }).then(() => {
    console.log('Đã đồng bộ Database RDS thành công! Bảng Tasks đã sẵn sàng.');
    app.listen(PORT, () => {
        console.log(`Server Backend đang chạy tại Port ${PORT}`);
    });
}).catch(err => {
    console.error('Lỗi không thể kết nối tới Database RDS:', err);
});
