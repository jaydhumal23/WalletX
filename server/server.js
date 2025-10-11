const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const connectDB = require("./config/connectDB");
const router = require("./routes/userRoute");
const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();

connectDB()
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use("/api/v1/users", router)

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
})