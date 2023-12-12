var express = require("express");
const Ifuser = require("../middleware/ifUser");
var router = express.Router();
const { findUserByEmail } = require("../helpers/usermodule");
const multer = require("multer");
const { addProducts, ProductDetailed } = require("../helpers/product");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
/* GET users listing. */

router.get("/", Ifuser, async function (req, res, next) {
  let user = null;
  let email = await req.session.user.email;
  await findUserByEmail(email).then((result) => {
    user = result[0].name;
  });
  let products = new Array();
  await ProductDetailed().then((result) => {
    result.forEach((element, index) => {
      let currentIndex = index + 1;
      products.push({
        sl: currentIndex,
        id: element.id,
        name: element.name,
        price: element.price,
        Image: `data:image/png;base64,${element.image}`,
        quantity: element.quantity,
      });
    });
  });
  res.render("users/user", { user: user, products: products });
});

module.exports = router;
