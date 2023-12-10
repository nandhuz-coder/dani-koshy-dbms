var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const { findUserByEmail, registerUser } = require("../helpers/usermodule");
const IfAccess = require("../middleware/allowaccess");
const Ifuser = require("../middleware/ifUser");
/* GET home page. */
router.get("/", IfAccess, function (req, res, next) {
  res.render("index", { title: "Quad shop" });
});

router.post("/", (req, res) => {
  const user = req.body;
  findUserByEmail(user.email)
    .then(async (result) => {
      if (result.length) {
        async function comparePassword(inputPassword, hashedPassword) {
          return await bcrypt.compareSync(inputPassword, hashedPassword);
        }
        if (comparePassword(user.pswd, result[0].password)) {
          req.session.user = {
            email: result[0].email,
            name: result[0].name,
            user_type: result[0].user_type,
          };
          if (result[0].user_type == "0") res.redirect("/users");
          else if (result[0].user_type == "1") res.redirect("/admin");
          else res.redirect("/dev");
        }
      } else {
        res.redirect("/register");
      }
    })
    .catch((error) => {
      res.render("/");
    });
});

router.get("/register", IfAccess, (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res) => {
  const user = req.body;
  async function hashPassword(password) {
    return await bcrypt.hashSync(password, 10);
  }
  const encryptpasword = await hashPassword(user.password);
  await registerUser(user.email, user.name, "0", encryptpasword)
    .then(() => {
      findUserByEmail(user.email)
        .then((result) => {
          req.session.user = {
            email: result[0].email,
            name: result[0].name,
            user_type: result[0].user_type,
          };
          if (result[0].user_type == "0") res.redirect("/users");
          else if (result[0].user_type == "1") res.redirect("/admin");
          else res.redirect("/dev");
        })
        .catch((error) => {
          console.log(error);
          res.json({ message: "unable to add user try again" });
        });
    })
    .catch((error) => {
      console.log(error);
      res.json({ message: "User exist with same Mail-Id" });
    });
});

router.get("/logout", Ifuser, (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
module.exports = router;
