var express = require("express");
const Ifuser = require("../middleware/ifUser");
const IfDev = require("../middleware/ifDev");
const {
  findUserByEmail,
  detailed,
  DeteleUser,
  AddUserType,
} = require("../helpers/usermodule");
var router = express.Router();

router.get("/", Ifuser, IfDev, async function (req, res, next) {
  let user = null;
  let details = new Array();
  let email = await req.session.user.email;
  await findUserByEmail(email).then((result) => {
    user = result[0].name;
  });
  await detailed().then((result) => {
    let usermode = null;
    let user = null;
    let admin = null;
    result.forEach(async (element, index) => {
      let currentIndex = index + 1;
      if (element.user_type == "1") {
        usermode = "Admin";
        admin = true;
      } else if (element.user_type == "2") usermode = "Dev";
      else {
        usermode = "user";
        user = true;
      }
      details.push({
        slNo: currentIndex,
        name: element.name,
        email: element.email,
        user_type: usermode,
        user: user,
        admin: admin,
      });
    });
  });
  res.render("dev/dev", { user: user, result: details });
});

router.post("/deleteUser", async (req, res) => {
  let email = req.body.email;
  await DeteleUser(email)
    .then(async (result) => {
      res.json({ message: "user removed successfully" });
    })
    .catch((err) => {
      res.json({ message: "cannot remove user" });
    });
});

router.post("/adduser", async (req, res) => {
  let email = req.body.email;
  await AddUserType(email)
    .then((result) => {
      res.json({ message: "User added to admin" });
    })
    .catch((err) => {
      res.json({ message: "user cant be add to admin list" });
    });
});

module.exports = router;
