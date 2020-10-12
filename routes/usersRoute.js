var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

// Register User
router.post("/", userController.register);

router.get("/login", userController.login);

router.get("/:username", auth.protect, userController.searchUser);

// router.use(auth.protect);

// router.get("/login", userController.login);
// router.get("/login", userController.login);
// router.get("/login", userController.login);
// router.get("/login", userController.login);
// router.get("/login", userController.login);

module.exports = router;
