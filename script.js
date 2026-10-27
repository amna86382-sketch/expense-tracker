const expenseForm = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const expenseList = document.getElementById("expenseList");
const totalElement = document.getElementById("total");
const emptyMessage = document.getElementById("emptyMessage");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const title = titleInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;
    if (
        title === "" ||
        !Number.isFinite(amount) ||
        amount <= 0 ||
        category === "" ||
        date === ""
    ) {
        alert("Please enter valid expense details.");
        return;
    }
    const expense = {
        id: Date.now(),
        title: title,
        amount: amount,
        category: category,
        date: date
    };
    expenses.push(expense);
    saveExpenses();
    displayExpenses();
    expenseForm.reset();
});
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
function displayExpenses() {
    expenseList.innerHTML = "";
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        const row = document.createElement("tr");

        const titleCell = document.createElement("td");
        titleCell.textContent = expense.title;

        const amountCell = document.createElement("td");
        amountCell.textContent =
            "Rs. " + expense.amount.toLocaleString("en-PK");

        const categoryCell = document.createElement("td");
        categoryCell.textContent = expense.category;

        const dateCell = document.createElement("td");
        dateCell.textContent = expense.date;

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            expenses = expenses.filter(function(item) {
                return item.id !== expense.id;
            });

            saveExpenses();
            displayExpenses();
    });
        actionCell.appendChild(deleteButton);

        row.appendChild(titleCell);
        row.appendChild(amountCell);
        row.appendChild(categoryCell);
        row.appendChild(dateCell);
        row.appendChild(actionCell);

        expenseList.appendChild(row);

        total = total + expense.amount;
}
    totalElement.textContent = total.toLocaleString("en-PK");
    emptyMessage.style.display =
        expenses.length === 0 ? "block" : "none";
}
displayExpenses();
