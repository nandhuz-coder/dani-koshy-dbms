var express = require("express");
const Ifuser = require("../middleware/ifUser");
const IfAdmin = require("../middleware/ifAdmin");
var router = express.Router();

/* GET users listing. */
router.get("/", Ifuser, IfAdmin, function (req, res, next) {
  res.render("admin/admin");
});

module.exports = router;
