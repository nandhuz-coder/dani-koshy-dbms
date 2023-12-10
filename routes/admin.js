var express = require("express");
const Ifuser = require("../middleware/ifUser");
const IfAdmin = require("../middleware/ifAdmin");
const { findUserByEmail } = require("../helpers/usermodule");
const multer = require("multer");
const { addProducts } = require("../helpers/product");
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });
var router = express.Router();

/* GET users listing. */
router.get("/", Ifuser, IfAdmin, async function (req, res, next) {
  let user = null;
  let email = await req.session.user.email;
  await findUserByEmail(email).then((result) => {
    user = result[0].name;
  });
  res.render("admin/admin", { user: user });
});

router.get("/add-products", Ifuser, IfAdmin, (req, res) => {
  res.render("admin/add");
});

router.post("/add-products", upload.single("productImage"), (req, res) => {
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const productImage = req.file.buffer;
  const base64Image = productImage.toString("base64");
  const insertValues = [productName, productPrice, base64Image];
  addProducts(insertValues).then((result) => {
    res.redirect(`/product/${result.insertId}`);
  });
});

module.exports = router;
