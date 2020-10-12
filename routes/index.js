var express = require("express");
var router = express.Router();
const auth = require("../middlewares/auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/dashboard", auth.protect, function (req, res, next) {
  res.sendFile(
    "/home/x/Data/nodejs/nodejs-tutorial/user-authorization/public/dashboard.html"
  );
});

module.exports = router;
