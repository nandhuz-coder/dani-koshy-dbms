var express = require("express");
const Ifuser = require("../middleware/ifUser");
const IfAdmin = require("../middleware/ifAdmin");
const { findUserByEmail } = require("../helpers/usermodule");
const multer = require("multer");
const {
  addProducts,
  ProductDetailed,
  DeteleProduct,
} = require("../helpers/product");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
var router = express.Router();

/* GET users listing. */
router.get("/", Ifuser, IfAdmin, async function (req, res, next) {
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
  res.render("admin/admin", { user: user, products: products });
});

router.get("/add-products", Ifuser, IfAdmin, async (req, res) => {
  await res.render("admin/add");
});

router.post("/add-products", upload.single("productImage"), (req, res) => {
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const productQuantity = req.body.quantity;
  const productImage = req.file.buffer;
  const base64Image = productImage.toString("base64");
  const insertValues = [
    productName,
    productPrice,
    base64Image,
    productQuantity,
  ];
  addProducts(insertValues).then((result) => {
    res.redirect(`/product/${result.insertId}`);
  });
});

router.post("/deleteProduct", async (req, res) => {
  let email = req.body.email;
  await DeteleProduct(email)
    .then(async (result) => {
      res.json({ message: "Product removed successfully" });
    })
    .catch((err) => {
      res.json({ message: "cannot remove Product" });
    });
});

module.exports = router;
