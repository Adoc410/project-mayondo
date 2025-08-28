const ctx = document.getElementById('taskChart').getContext('2d');
const taskChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Completed', 'Pending', 'In Progress'],
        datasets: [{
            data: [12, 5, 3],
            backgroundColor: ['#4CAF50', '#FF9800', '#2196F3']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' }
        }
    }
});
