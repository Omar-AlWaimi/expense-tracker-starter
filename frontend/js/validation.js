function checkValidation(title, amountNumber, category, date) {
    const formAlert = document.getElementById("formAlert");

    if (title.trim() == "") {
        showAlert("Title is required.");
        return false;
    }

    if (isNaN(amountNumber) || amountNumber <= 0) {
        showAlert("Amount must be greater than 0.");
        return false;
    }

    if (!category || category == "Choose...") {
        showAlert("Please choose a category.");
        return false;
    }

    if (date == "") {
        showAlert("Date is required.");
        return false;
    }

    formAlert.classList.add("d-none");
    return true;
}


function checkEditValidation(title, amount, category, date) {
    const editAlert = document.getElementById("editAlert");

    if (title.trim() == "") {
        editAlert.textContent = "Title is required.";
        editAlert.classList.remove("d-none");
        return false;
    }

    if (isNaN(amount) || amount <= 0) {
        editAlert.textContent = "Amount must be greater than 0.";
        editAlert.classList.remove("d-none");
        return false;
    }

    if (!category) {
        editAlert.textContent = "Please choose a category.";
        editAlert.classList.remove("d-none");
        return false;
    }

    if (date == "") {
        editAlert.textContent = "Date is required.";
        editAlert.classList.remove("d-none");
        return false;
    }
    editAlert.classList.add("d-none");
    return true;
}