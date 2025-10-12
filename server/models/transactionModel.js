const mongoose = require("mongoose");


const transactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: [true, "amount is required"]
    },
    type: {
        type: String,
        required: [true, "type is required"]
    },
    category: {
        type: String,
        required: [true, "category is required"]
    },
    refrence: {
        type: String,

    },
    description: {
        type: String,
        required: [true, "description required"]
    },
    date: {
        type: Date,

    }
}, { timestamps: true })

const transactionModel = mongoose.model("transactionModel", transactionSchema);

module.exports = transactionModel;
