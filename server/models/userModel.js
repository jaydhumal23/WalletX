const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [
            true, "name is required"
        ]
    },
    email: {
        type: String,
        require: [
            true, "email is required and should be unique"
        ],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }
}, {
    timestamps: true
})


const userModel = mongoose.model("user", userSchema)

module.exports = userModel;