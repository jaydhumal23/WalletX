const transactionModel = require("../models/transactionModel")

const getAllTransactions = async (req, res) => {
    try {
        const { userId } = req.body;
       
        const transaction = await transactionModel.find({ userId: userId });
        res.status(200).json(
            transaction
        )
    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }

}
const createTransaction = async (req, res) => {
    try {

        const transaction = new transactionModel(req.body);
        await transaction.save();
        res.status(201).send("Transaction Created ! ")
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

module.exports = {
    getAllTransactions, createTransaction
}