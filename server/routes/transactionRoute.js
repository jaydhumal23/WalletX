const express = require("express")
const router = express.Router();
const { getAllTransactions, createTransaction, editTransaction, deleteTransaction } = require("../controller/transactionController")

router.post("/get-transactions", getAllTransactions);
router.post("/create-transaction", createTransaction);
router.put("/edit-transaction", editTransaction);
router.delete("/delete-transaction/:id", deleteTransaction)

module.exports = router;
