var express = require("express");
const Ifuser = require("../middleware/ifUser");
var router = express.Router();

/* GET users listing. */
router.get("/", Ifuser, function (req, res, next) {
  res.render("users/user");
});

module.exports = router;
