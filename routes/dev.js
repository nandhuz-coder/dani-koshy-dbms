var express = require("express");
const Ifuser = require("../middleware/ifUser");
const IfDev = require("../middleware/ifDev");
var router = express.Router();

/* GET users listing. */
router.get("/", Ifuser, IfDev, function (req, res, next) {
  res.render("dev/dev");
});

module.exports = router;
