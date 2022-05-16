const router = require("express").Router();
const memberController = require("../controller/memberController");
const authController = require("./../controller/authController");

router.post("/change-password", authController.isLogin, authController.changePassword)
router.post("/register", memberController.register);
router.post("/login", memberController.login);
router.get("/logout", authController.logout);
router.get("/verify-token", authController.verifyToken);

module.exports = router