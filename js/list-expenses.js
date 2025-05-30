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

        if (p) { p.remove() }

        //Create the list
        const ul = document.createElement("ul");
        ul.classList.add("section-list")

        expensesCategory.forEach(expense => {
            const li = document.createElement("li");

            li.innerHTML = `
                <p class="exp-item">${expense.description}: <span class="exp-amount">$${expense.amount}</span></p>

                <button class="deleteBtn" data-id="${expense.id}">Delete</button>
                <button class="updateBtn" data-id="${expense.id}">Update</button>
            `

            const deleteBtn = li.querySelector(".deleteBtn");
            const updateBtn = li.querySelector(".updateBtn");

            deleteBtn.addEventListener("click", (event) => {
                const id = parseInt(event.target.dataset.id);

                //Delete from array:
                expenses = expenses.filter(exp => exp.id !== id);

                //Update LocalStorage:
                localStorage.setItem("expenses", JSON.stringify(expenses));

                //Delete from DOM:
                li.remove();
            });

            updateBtn.addEventListener("click", (event) => {
                const id = parseInt(event.target.dataset.id);
                const expenseToUpdate = expenses.find(exp => exp.id === id);

                let newDescription = prompt("Enter the new description: ", expenseToUpdate.description);
                let newAmount = prompt("Enter the new amount: ", expenseToUpdate.amount);

                if (newDescription && newAmount) {
                    expenseToUpdate.description = newDescription;
                    expenseToUpdate.amount = parseFloat(newAmount);
                }

                localStorage.setItem("expenses", JSON.stringify(expenses));

                li.querySelector(".exp-item").innerHTML = `
                    ${expenseToUpdate.description}: <span class="exp-amount">$${expenseToUpdate.amount}</span>
                `;
            })
           
            ul.appendChild(li);
        })

        section.appendChild(ul)
    }

    console.log(categories)
}