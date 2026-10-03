function renderTable(expenses) {
    const tb = document.getElementById("expensesTableBody");
    tb.innerHTML = "";

    expenses.forEach(function (expense) {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.textContent = expense.title;
        tr.append(td1);
        const td2 = document.createElement("td");
        td2.textContent = expense.amount;
        td2.classList.add("text-end");
        tr.append(td2);
        const td3 = document.createElement("td");
        const badge = document.createElement("span");
        badge.textContent = expense.category;
        // const h6 = document.createElement("h6");

        switch (expense.category) {
            case "Food":
                badge.classList.add("badge", "text-bg-primary");
                break;
            case "Transport":
                badge.classList.add("badge", "text-bg-secondary");
                break;
            case "Bills":
                badge.classList.add("badge", "text-bg-warning");
                break;
            case "Entertainment":
                badge.classList.add("badge", "text-bg-danger");
                break;
            case "Other":
                badge.classList.add("badge", "text-bg-info");
                break;
            default:
                badge.classList.add("badge", "text-bg-secondary");
        }

        td3.append(badge);
        tr.append(td3);

        const td4 = document.createElement("td");
        td4.textContent = expense.date;
        tr.append(td4);


        const td5 = document.createElement("td");
        const editbtn = document.createElement("button");
        editbtn.textContent = "Edit";
        editbtn.classList.add("btn", "btn-outline-secondary", "float-end");
        editbtn.addEventListener("click", function () { update(expense); });

        td5.append(editbtn);
        const deletebtn = document.createElement("button");
        deletebtn.textContent = "Delete";
        deletebtn.classList.add("btn", "btn-outline-danger", "float-end", "me-2");
        deletebtn.addEventListener("click", async function () { await deleteExpense(expense.id); });

        td5.append(deletebtn);
        tr.append(td5);
        tb.append(tr);
    });
}


function showAlert(message) {
    const formAlert = document.getElementById("formAlert");
    formAlert.textContent = message;
    formAlert.classList.remove("d-none");
}


async function renderSummary(expenses) {

    const totalNumber = expenses.reduce(
        function (total, expense) {
            return total + parseFloat(expense.amount);
        },
        0
    );

    const expenseNumber = expenses.length;

    let maxExpense = { amount: 0, name: "" };

    for (const expense of expenses) {
        const amount = parseFloat(expense.amount);

        if (amount > maxExpense.amount) { maxExpense = { amount, name: expense.title }; }
    }

    document.getElementById("totalNumber").textContent =
        "$" + totalNumber.toFixed(2);

    document.getElementById("expenseNumber").textContent =
        expenseNumber;

    document.getElementById("highestExpense").textContent =
        "$" + maxExpense.amount.toFixed(2);

    document.getElementById("nameOfExpense").textContent = maxExpense.name;
}


function update(expense) {
    editingId = expense.id;

    document.getElementById("editTitle").value = expense.title;
    document.getElementById("editAmount").value = expense.amount;
    document.getElementById("editCategory").value = expense.category;
    document.getElementById("editDate").value = expense.date;

    const myModal = document.getElementById("editModal");

    const modal = bootstrap.Modal.getOrCreateInstance(myModal);

    modal.show();
}


function applyFilter() {
    const selectedCategory = document.getElementById("filterCategory").value;
    let expensesToShow = allExpenses;

    if (selectedCategory !== "All Categories") {
        expensesToShow = allExpenses.filter(function (expense) {
            return expense.category === selectedCategory;
        });
    }

    renderTable(expensesToShow);
    renderSummary(expensesToShow);
}

function showSpinner() { document.getElementById("loadingSpinner").classList.remove("d-none"); }

function hideSpinner() { document.getElementById("loadingSpinner").classList.add("d-none"); }