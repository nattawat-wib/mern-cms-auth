const router = require("express").Router();
const memberController = require("../controller/memberController");

// memberController.register()

router.route("/")
    .post(memberController.register)

module.exports = router