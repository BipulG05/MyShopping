const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserDetails, getAllUser, getUserProfile, updateUserRole, deleteUser } = require('../controllers/userControler');
const { isAuthenticateduser, autherisedRole } = require("../middlware/auth");
const router = express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticateduser,getUserDetails);
router.route("/password/update").put(isAuthenticateduser,updateUserPassword);
router.route("/me/update").put(isAuthenticateduser,updateUserDetails);

router.route("/admin/users").get(isAuthenticateduser,autherisedRole('admin'),getAllUser);
router.route("/admin/user/:id").get(isAuthenticateduser,autherisedRole('admin'),getUserProfile).put(updateUserRole).delete(deleteUser);





module.exports = router;