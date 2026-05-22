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

// Cấu hình thư mục tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// --- API ---
app.get('/api/suppliers', async (req, res) => {
    try {
        const suppliers = await Supplier.findAll(); 
        res.json(suppliers);
    } catch (err) {
        console.error('Lỗi truy vấn:', err);
        res.status(500).json({ error: 'Không thể lấy dữ liệu' });
    }
});

app.delete('/api/suppliers/:id', async (req, res) => {
    try {
        await Supplier.destroy({ where: { id: req.params.id } });
        res.status(200).send('Đã xóa thành công');
    } catch (err) {
        console.error('Lỗi xóa:', err);
        res.status(500).json({ error: 'Không thể xóa dữ liệu' });
    }
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