const transactionModel = require("../models/transactionModel")
const moment = require("moment")
const getAllTransactions = async (req, res) => {
    try {
        const { userId, frequency, selectedDate, selectedType } = req.body;

        const transaction = await transactionModel.find({
            userId,
            ...(frequency !== "custom" ? { date: { $gt: moment().subtract(Number(frequency), "d").toDate() } } : { date: { $gte: selectedDate[0], $lte: selectedDate[1] } })
            , ...(selectedType !== "all" && { type: selectedType })
        }).sort({ date: -1 });
        res.status(200).json(
            transaction
        )
    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }

}
const editTransaction = async (req, res) => {
    const { transactionId } = req.body;
    try {
        const update = await transactionModel.findOneAndUpdate({ _id: transactionId }, req.body.payload)
        res.status(200).send("Edit Successfully!")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
const deleteTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        console.log(transactionId)
        const remove = await transactionModel.findByIdAndDelete({ _id: transactionId })
        res.status(200).send("Transaxtion Deleted ")
    } catch (error) {
        console.log(error);
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
    getAllTransactions, createTransaction, editTransaction, deleteTransaction
}