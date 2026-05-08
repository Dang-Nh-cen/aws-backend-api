const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Khởi tạo kết nối đến RDS MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false // Tắt log SQL cho đỡ rối terminal
});

// Định nghĩa một Table đơn giản: Task (Công việc)
const Task = sequelize.define('Task', {
    title: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'pending' }
});

module.exports = { sequelize, Task };