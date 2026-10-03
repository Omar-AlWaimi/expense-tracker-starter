const API_URL = "http://localhost:3000/api/expenses";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// api methods
async function getExpenses() {
    showSpinner();

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            const message = await response.json();
            showAlert(message);
            return [];
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        showAlert("there is an error in server check the backend.");
        return [];
    }
    finally {
        hideSpinner();
    }
}


async function deleteExpense(id) {
    try {
        const response = await fetch(API_URL + "/" + id, {
            method: "DELETE"
        });
        if (!response.ok) {
            const message = await response.json();
            showAlert(message);
            return;
        }
        await refresh();
    } catch (error) {
        console.error(error);
        showAlert("there is an error in server check the backend.");
    }
}


async function addExpense(data) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const message = await response.json();

            showAlert(message);
            return;
        }
        await refresh();
        expenseForm.reset();
    } catch (error) {
        console.error(error);
        showAlert("there is an error in server check the backend.");
    }
}


async function updateExpense(id, data) {
    try {
        const response = await fetch(API_URL + "/" + id, {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const message = await response.json();
            showAlert(message);
            return;
        }
        editingId = null;
        // expenseForm.reset();
        await refresh();
    } catch (error) {
        console.error(error);
        showAlert("there is an error in server check the backend.");
    }
}
