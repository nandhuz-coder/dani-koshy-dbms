var express = require("express");
const Ifuser = require("../middleware/ifUser");
const { takeProduct } = require("../helpers/product");
var router = express.Router();

/* GET users listing. */
router.get(`/:productId`, Ifuser, async (req, res, next) => {
  const productId = req.params.productId;
  await takeProduct(productId).then((result) => {
    res.render("product/product", {
      productName: result[0].name,
      productPrice: result[0].price,
      productImage: `data:image/png;base64,${result[0].image}`,
    });
  });
});

module.exports = router;
