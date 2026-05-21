document.addEventListener('DOMContentLoaded', () => {
    init();
});

async function init() {
    try {
        const response = await fetch('/api/suppliers');
        const data = await response.json();
        
        // 1. Cập nhật bảng và count
        const tbody = document.getElementById('supplier-table');
        document.getElementById('supplier-count').innerText = data.length;

        tbody.innerHTML = data.map(s => `
            <tr class="align-middle">
                <td>#${s.id}</td>
                <td><strong>${s.name}</strong></td>
                <td>${s.address}</td>
                <td><span class="badge bg-success-subtle text-success">Active</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-warning me-2">Edit</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteSupplier(${s.id})">Delete</button>
                </td>
            </tr>
        `).join('');

        // 2. Vẽ biểu đồ
        const areaCounts = data.reduce((acc, s) => {
            acc[s.address] = (acc[s.address] || 0) + 1;
            return acc;
        }, {});
        renderChart(Object.keys(areaCounts), Object.values(areaCounts));

    } catch (err) { console.error('Lỗi khởi tạo:', err); }
}

function renderChart(labels, values) {
    const ctx = document.getElementById('supplierChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{ data: values, backgroundColor: ['#5d4037', '#8d6e63', '#d7ccc8'] }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

async function deleteSupplier(id) {
    if (confirm('Xóa đối tác này?')) {
        await fetch(`/api/suppliers/${id}`, { method: 'DELETE' });
        init(); 
    }
}