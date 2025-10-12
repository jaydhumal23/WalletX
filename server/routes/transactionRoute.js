const express = require("express")
const router = express.Router();
const { getAllTransactions, createTransaction } = require("../controller/transactionController")

router.post("/get-transactions", getAllTransactions);
router.post("/create-transaction", createTransaction);

module.exports = router;
