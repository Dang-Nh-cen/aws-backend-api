document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/suppliers')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('supplier-table');
            const supplierCount = document.getElementById('supplier-count');
            
            // Cập nhật số lượng
            supplierCount.innerText = data.length;

            // Đổ dữ liệu vào bảng
            tbody.innerHTML = data.map(s => `
                <tr>
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.address}</td>
                    <td><span class="badge bg-success">Active</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger">Xóa</button>
                    </td>
                </tr>
            `).join('');
        })
        .catch(err => console.error('Lỗi lấy dữ liệu:', err));
});