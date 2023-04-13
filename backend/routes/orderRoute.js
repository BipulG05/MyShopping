const express = require('express');
const { newOrder, getMyOrder, getSingleOrder, getAllOrder, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const { isAuthenticateduser, autherisedRole } = require('../middlware/auth');
const router = express.Router();


router.route('/order/new').post(isAuthenticateduser,newOrder);
router.route('/order/:id').get(isAuthenticateduser,getSingleOrder);
router.route('/orders/me').get(isAuthenticateduser,getMyOrder);

router.route('/admin/orders').get(isAuthenticateduser,autherisedRole('admin'),getAllOrder);
router.route('/admin/order/:id').put(isAuthenticateduser,autherisedRole('admin'),updateOrderStatus)
.delete(isAuthenticateduser,autherisedRole('admin'),deleteOrder);





module.exports = router