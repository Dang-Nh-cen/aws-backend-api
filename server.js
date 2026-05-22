const express = require('express');
const cors = require('cors');
const path = require('path');

// Import đúng cấu trúc của Sequelize từ file database.js
const { sequelize, Supplier } = require('./database'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Rất quan trọng để đọc dữ liệu JSON

// Phục vụ file tĩnh (CSS, JS, HTML)
app.use(express.static(path.join(__dirname, 'public')));

// --- CÁC API CHO HỆ THỐNG SCM ---

// API: Lấy danh sách nhà cung cấp
app.get('/api/suppliers', async (req, res) => {
    try {
        // Sử dụng hàm findAll() của Sequelize thay vì câu lệnh SQL thô
        const suppliers = await Supplier.findAll(); 
        res.json(suppliers);
    } catch (err) {
        console.error('Lỗi truy vấn database:', err);
        res.status(500).json({ error: 'Không thể lấy dữ liệu' });
    }
});

// API: Xóa nhà cung cấp
app.delete('/api/suppliers/:id', async (req, res) => {
    try {
        // Sử dụng hàm destroy() của Sequelize
        await Supplier.destroy({ 
            where: { id: req.params.id } 
        });
        res.status(200).send('Đã xóa thành công');
    } catch (err) {
        console.error('Lỗi khi xóa:', err);
        res.status(500).json({ error: 'Không thể xóa dữ liệu' });
    }
});

// Route chính cho Frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Khởi chạy server và kết nối Database
sequelize.sync().then(() => {
    console.log('✅ Đã kết nối và đồng bộ Database RDS thành công!');
    app.listen(PORT, () => {
        console.log(`🚀 Server Backend đang chạy tại Port ${PORT}`);
    });
}).catch(err => {
    console.error('❌ Lỗi không thể kết nối tới Database RDS:', err);
});