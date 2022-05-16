const router = require("express").Router();
const memberController = require("../controller/memberController");
const authController = require("./../controller/authController");

router.post("/register", memberController.register);
router.post("/login", memberController.login);
router.get("/logout", authController.isLogin, authController.logout);

module.exports = router