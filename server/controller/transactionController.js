const transactionModel = require("../models/transactionModel")
const moment = require("moment")
const getAllTransactions = async (req, res) => {
    try {
        const { userId, frequency, selectedDate, selectedType } = req.body;
        console.log(frequency)
        console.log(selectedType)
        const transaction = await transactionModel.find({
            userId,
            ...(frequency !== "custom" ? { date: { $gt: moment().subtract(Number(frequency), "d").toDate() } } : { date: { $gte: selectedDate[0], $lte: selectedDate[1] } })
            , ...(selectedType !== "all" && { type:selectedType })
        }).sort({ date: -1 });
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