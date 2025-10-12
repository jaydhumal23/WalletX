const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config();
const jwtpass = process.env.pass

const registerController = async (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) return res.send('something went wrong')
            try {
                const user = await userModel.create({
                    name,
                    email,
                    password: hash,

                })
                res.clearCookie("token");

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
        })
    })

}
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password, jwtpass)
        const user = await userModel.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(400).send("User not Found");
        }
        await bcrypt.compare(password, user.password, (err, result) => {
            if (!result) {
                console.log("err in allocating token")

            }
            const token = jwt.sign({ email: user.email }, jwtpass)

            res.cookie("token", token);
            res.status(200).json({
                success: true,
                user
            })
        })



    } catch (err) {
        res.status(400).json({
            success: false,
            err,
        })
    }

}
const logincheckController = async (req, res) => {
    try {
        const user = jwt.verify(req.cookies.token, jwtpass)
        const details = await userModel.findOne({ email: user.email });
        res.status(200).json({
            success: true,
            user,
            details,
        })
    }
    catch (err) {


    }
}
const logoutController = (req, res) => {
    try {
        res.clearCookie("token")

        res.status(200).json({
            success: true,

        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            err,
        })
    }
}
module.exports = { loginController, registerController, logincheckController, logoutController }