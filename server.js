const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import Sequelize models
const { sequelize, Supplier } = require('./database'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));

// --- API 1: Health Check cho AWS Load Balancer (Bắt buộc phải có) ---
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Hệ thống đang hoạt động' });
});

// --- API 2: Lấy dữ liệu nhà cung cấp ---
app.get('/api/suppliers', async (req, res) => {
    try {
        const suppliers = await Supplier.findAll(); 
        res.json(suppliers);
    } catch (err) {
        console.error('Lỗi truy vấn:', err);
        res.status(500).json({ error: 'Không thể lấy dữ liệu' });
    }
});

// --- API 3: Xóa nhà cung cấp ---
app.delete('/api/suppliers/:id', async (req, res) => {
    try {
        await Supplier.destroy({ where: { id: req.params.id } });
        res.status(200).send('Đã xóa thành công');
    } catch (err) {
        console.error('Lỗi xóa:', err);
        res.status(500).json({ error: 'Không thể xóa dữ liệu' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Chạy server & Kết nối DB
sequelize.sync().then(() => {
    console.log('✅ Đã kết nối Database RDS');
    app.listen(PORT, () => {
        console.log(`🚀 Server chạy tại Port ${PORT}`);
    });
}).catch(err => {
    console.error('❌ Lỗi Database:', err);
});