//Get the localStorage data:
const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

//Add amounts by category:
const totals = {};

expenses.forEach(({category, amount}) => {
    const key = category.toLowerCase();

    if (!totals[key]) { totals[key] = 0 }

    totals[key] += parseFloat(amount);
});

//Display totals in HTML:
const listItems = document.querySelectorAll(".list-item");

listItems.forEach(li => {
    const originalCategory = li.dataset.category;
    const key = originalCategory.toLowerCase();
    const total = totals[key] || 0;

    li.innerHTML = `${originalCategory}: <span class="total-span">$${total.toFixed(2)}</span>`;
});

//Chart with Chart.js:
const ctx = document.getElementById("myChart").getContext("2d");

const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: Object.keys(totals),
        datasets: [{
            label: 'Total Expenses',
            data: Object.values(totals),
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6B6B']
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true }
        }
    }
});