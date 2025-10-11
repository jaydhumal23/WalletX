const userModel = require("../models/userModel")
const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.create({
            name,
            email,
            password,

        })
        res.clearCookie("username");

        res.status(200).json({
            success: true,
            user
        })
    }

    catch (err) {
        res.status(400).json({
            success: false,
            err
        })
    }
}
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        if (!user) {
            return res.status(400).send("User not Found");
        }
        res.cookie("username", "jay")
        res.status(200).json({
            success: true,
            user
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            err,
        })
    }

}
module.exports = { loginController, registerController }