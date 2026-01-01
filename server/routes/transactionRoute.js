const express = require("express")
const router = express.Router();
const {generalLimiter}=require("../middlewares/rate-limiter")
const { getAllTransactions, createTransaction, editTransaction, deleteTransaction } = require("../controller/transactionController")

router.post("/get-transactions",generalLimiter, getAllTransactions);
router.post("/create-transaction",generalLimiter ,createTransaction);
router.put("/edit-transaction",generalLimiter ,editTransaction);
router.delete("/delete-transaction/:id",generalLimiter ,deleteTransaction)

module.exports = router;
