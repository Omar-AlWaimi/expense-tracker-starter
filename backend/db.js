const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
//===========================================================
function isEmpty(arr) {
    return arr.length === 0;
}
//===========================================================
const getExpenses = async (request, response) => {
    try {
        const datas = await pool.query("select id,title, amount::float8,category,to_char(date, 'YYYY-MM-DD') date from expenses")
        response.json(datas.rows);
    }
    catch (error) {
        response.status(500).json("there is this " + error)
    }
}
//===========================================================
const getExpensesById = async (req, res) => {
    const num = parseInt(req.params.id);
    if (isNaN(num)) {
        return res.status(400).json("ID must be a number ");
    } try {
        const datas = await pool.query("SELECT id, title, amount::float8, category,to_char(date, 'YYYY-MM-DD') AS date FROM expenses WHERE id = $1", [num]);

        if (isEmpty(datas.rows)) {
            return res.status(404).json("its empty \'not found\' ");
        }
        res.json(datas.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json("there is this " + error)
    }
};
//===========================================================

const createExpenses = async (req, res) => {
    const { title, amount, category, date } = req.body;
    if (!title || !amount || !category || !date) {
        return res.status(400).json("there is something wronge in your input in ==> title, amount, category and date ");
    }
    if (amount <= 0 || isNaN(amount)) {
        return res.status(400).json("must put positeve number in amount");
    }

    const allowedCategories = [
        "Food",
        "Transport",
        "Bills",
        "Entertainment",
        "Other"
    ];

    if (!allowedCategories.includes(category)) {
        return res.status(400).json("Invalid category");
    }
    try {
        const datas = await pool.query("INSERT INTO expenses (title, amount,category,date) VALUES ($1,$2,$3,$4) RETURNING * ", [title, amount, category, date])
        res.status(201).json(datas.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json("there is this " + error)
    }
}
//===========================================================

const updateExpenses = async (req, res) => {

    const num = parseInt(req.params.id)
    if (isNaN(num)) {
        return res.status(400).json("ID must be a number ");
    }
    const { title, amount, category, date } = req.body;
    if (!title || !amount || !category || !date) {
        return res.status(400).json("there is something wronge in your input in ==> title, amount, category and date ");
    } else if (amount <= 0 || isNaN(amount)) {
        return res.status(400).json("must put positive  number in amount");
    } 
    
      const allowedCategories = [
        "Food",
        "Transport",
        "Bills",
        "Entertainment",
        "Other"
    ];

    if (!allowedCategories.includes(category)) {
        return res.status(400).json("Invalid category.");
    }

    
    try {
        const datas = await pool.query("UPDATE expenses SET title=$1,amount=$2,category=$3,date=$4 where id=$5  RETURNING *", [title, amount, category, date, num])
        if (isEmpty(datas.rows)) {
            return res.status(404).json("its empty \'not found\' ");
        }
        res.json(datas.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json("there is this " + error)
    }
}
//===========================================================
const deleteExpenses = async (req, res) => {

    const num = parseInt(req.params.id)
    if (isNaN(num)) {
        return res.status(400).json("ID must be a number ");
    } try {
        const datas = await pool.query("DELETE FROM expenses WHERE id=$1 RETURNING *", [num])

        if (isEmpty(datas.rows)) {
            return res.status(404).json("there is no data in this ID");
        }
        res.send("User deleted with ID: " + num)
    } catch (error) {
        console.error(error);
        res.status(500).json("there is this " + error)
    }
}

//===========================================================
module.exports = { pool, getExpenses, getExpensesById, createExpenses, updateExpenses, deleteExpenses }
