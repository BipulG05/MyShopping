const express = require("express");
const { getAllProducts,createProduct,updateproduct, deleteProduct, getProductDetails, createProductReview, getAllReview, deleteReview } = require("../controllers/productController");
const { isAuthenticateduser,autherisedRole } = require("../middlware/auth");


const router = express.Router();


router.route("/products").get(getAllProducts);
router.route("/admin/products/new").post(isAuthenticateduser,autherisedRole("admin"),createProduct);
router.route("/admin/product/:id").put(isAuthenticateduser,autherisedRole("admin"),updateproduct)
    .delete(isAuthenticateduser,autherisedRole("admin"),deleteProduct);

router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticateduser,createProductReview)
router.route("/review").get(getAllReview).delete(isAuthenticateduser,autherisedRole("admin"),deleteReview)




module.exports = router