const form = document.querySelector("#form");

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const description = document.querySelector("#description").value;
    const amount = document.querySelector("#amount").value;
    const category = document.querySelector("#category").value;
    const date = document.querySelector("#date").value;

    const expense = {description, amount, category, date};

    let savedExpenses = JSON.parse(localStorage.getItem("expenses"));

    if (!Array.isArray(savedExpenses)) { savedExpenses = [] }

    savedExpenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(savedExpenses));

    form.reset();
})