var express = require("express");
var router = express.Router();
const config = require("../config/config");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", (req, res) => {
  const adminMail = config.email;
  const adminPass = config.password;
  const getmail = req.body.email;
  const getpass = req.body.pswd;
  if (getmail == adminMail && getpass == adminPass) {
    res.redirect("/admin");
  } else {
    res.redirect("/users");
  }
});

module.exports = router;
