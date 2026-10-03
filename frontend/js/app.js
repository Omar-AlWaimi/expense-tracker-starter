// its like the brain of the app, it connects all the other js files together and makes them work together

const expenseForm = document.getElementById("addExpenseForm");
let editingId = null;
let allExpenses = [];
let expenseChart = null;

async function refresh() {
    const expenses = await getExpenses();

    allExpenses = expenses;
    renderTable(allExpenses);
    renderSummary(allExpenses);
    renderChart(allExpenses);

}

async function handleFormSubmit(event) {
    event.preventDefault();
    const title = document.getElementById("inputTitle").value;
    const amount = document.getElementById("inputAmount").value;
    const category = document.getElementById("inputCategory").value;
    const date = document.getElementById("inputDate").value;
    const amountNumber = parseFloat(amount);

    const isValid = checkValidation(
        title,
        amountNumber,
        category,
        date
    );

    if (!isValid) {
        return;
    }
    const expenseData = {
        title: title,
        amount: amountNumber,
        category: category,
        date: date
    };
    // if (editingId !== null) {
    //     await updateExpense(editingId, expenseData);
    // } else {
    //     await addExpense(expenseData);
    // }
    await addExpense(expenseData);
}

expenseForm.addEventListener("submit", handleFormSubmit);

const editExpenseForm = document.getElementById("editExpenseForm");

editExpenseForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("editTitle").value;

    const amount = parseFloat(document.getElementById("editAmount").value);

    const category = document.getElementById("editCategory").value;

    const date = document.getElementById("editDate").value;

    const isValid = checkEditValidation(title, amount, category, date);

    if (!isValid) { return; }

    const expenseData = { title: title, amount: amount, category: category, date: date };

    await updateExpense(editingId, expenseData);

    const myModal = document.getElementById("editModal");

    const modal = bootstrap.Modal.getInstance(myModal);

    modal.hide();
});

document.getElementById("filterCategory").addEventListener("change",applyFilter);


const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", function () {
    const html = document.documentElement;

    if (html.getAttribute("data-bs-theme") === "dark") {
        html.setAttribute("data-bs-theme", "light");
        darkModeBtn.textContent = " Dark Mode";
    } else {
        html.setAttribute("data-bs-theme", "dark");
        darkModeBtn.textContent = " Light Mode";
    }});

function exportCSV() {
    let csv = "Title,Amount,Category,Date\n";

    allExpenses.forEach(function (expense) {csv = csv + expense.title + "," + expense.amount + "," +
            expense.category + "," + expense.date + "\n";});

    const link = document.createElement("a");

    link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    link.download = "expenses.csv";
    link.click();
}

document.getElementById("exportCsvBtn").addEventListener("click",exportCSV);

function renderChart(expenses) {
    const totals = {Food: 0, Entertainment: 0, Bills: 0,Transport: 0,Other: 0 };

    expenses.forEach(function (expense) {totals[expense.category] += parseFloat(expense.amount);});

    const ctx = document.getElementById("expenseChart");

    if (expenseChart) {expenseChart.destroy();}

    expenseChart = new Chart(ctx, {
        type: "pie",
        data: {labels: Object.keys(totals),  datasets: 
            [{data: Object.values(totals)}]
        }});}

refresh();