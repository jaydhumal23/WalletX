const express = require("express");
const { loginController, registerController, logincheckController, logoutController } = require("../controller/userController");

const router = express.Router()
router.post("/register", registerController)
router.post("/login", loginController)
router.get("/logincheck", logincheckController)
router.get("/logout", logoutController)

module.exports = router