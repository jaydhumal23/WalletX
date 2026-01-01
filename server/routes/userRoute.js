const express = require("express");
const { loginController, registerController, logincheckController, logoutController } = require("../controller/userController");
const { authLimiter } = require("../middlewares/rate-limiter")
const router = express.Router()
router.post("/register", authLimiter, registerController)
router.post("/login", authLimiter, loginController)
router.get("/logincheck", authLimiter, logincheckController)
router.get("/logout", authLimiter, logoutController)

module.exports = router