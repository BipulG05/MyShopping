const express = require('express');
const router = express.Router();
const { isAuthenticateduser, autherisedRole } = require('../middlware/auth');
const { getAdminCategorys,updateCategory,createCategory,deleteCategory } = require('../controllers/categoryController');
const { createBrand,updateBrand,deleteBrand,getAdminBrands } = require('../controllers/brandController');



// Category routers
router.route("/categories").get(getAdminCategorys);

router.route('/admin/categoris').get(isAuthenticateduser,autherisedRole('admin'),getAdminCategorys);
router.route("/admin/category/new").post(isAuthenticateduser,autherisedRole("admin"),createCategory);
router.route('/admin/category/:id').put(isAuthenticateduser,autherisedRole('admin'),updateCategory)
.delete(isAuthenticateduser,autherisedRole('admin'),deleteCategory);


// Brand routers
router.route("/brands").get(getAdminBrands);

router.route('/admin/categoris').get(isAuthenticateduser,autherisedRole('admin'),getAdminBrands);
router.route("/admin/category/new").post(isAuthenticateduser,autherisedRole("admin"),createBrand);
router.route('/admin/category/:id').put(isAuthenticateduser,autherisedRole('admin'),updateBrand)
.delete(isAuthenticateduser,autherisedRole('admin'),deleteBrand);






module.exports = router