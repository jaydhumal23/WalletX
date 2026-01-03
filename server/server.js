const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/connectDB");
const userRouter = require("./routes/userRoute");
const transactionRouter = require("./routes/transactionRoute")
const PORT = process.env.PORT || 8000;
const jwtpass = process.env.pass
const app = express();

connectDB()

app.use(cookieParser())
app.use(express.json());
app.set('trust proxy', 1);
app.use(cors({
    origin: ["http://localhost:5173", "https://walletx-1jay.vercel.app"],
    credentials: true
}))
app.use("/api/v1/users", userRouter)
app.use("/api/v1/transactions/", transactionRouter)
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
})