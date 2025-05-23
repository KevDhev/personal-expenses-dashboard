//Read objects from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

//Group by category
const categories = {};

expenses.forEach(expense => {
    const category = expense.category;

    if (!categories[category]) {
        categories[category] = [];
    }

    categories[category].push(expense);
});

//Replace the <p> with a <ul> with the expenses
for (let category in categories) {
    let expensesCategory = categories[category];
    const section = document.getElementById(category);

    if (section) {
        // Remove the <p>
        const p = section.querySelector("p");

        if (p) { 
            p.remove() 
        }

        //Create the list
        const ul = document.createElement("ul");

        expensesCategory.forEach(expense => {
            const li = document.createElement("li");
            li.textContent = `${expense.description}: $${expense.amount}`;
            ul.appendChild(li);
        })

        section.appendChild(ul)
    }
}