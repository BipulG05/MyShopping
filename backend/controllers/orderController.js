const Order = require('../models/orderModel');
const Product = require('../models/producModel');
const ErrorHandler = require('../utils/errorhanler');
const catchAsyncError = require('../middlware/catchAsyncError');
const Apifeatures = require('../utils/apifeatures');

//create new order
exports.newOrder = catchAsyncError(
    async (req,res,next) => {
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;
        
        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt:Date.now(),
            user:req.user._id,
        });
        res.status(201).json({
            success:true,
            order,
        })
    });

// get single Order
exports.getSingleOrder = catchAsyncError(
    async (req,res,next) =>{
        const order = await Order.findById(req.params.id).populate("user","name email");
        if(!order){
            return next(new ErrorHandler("Order not found with this id",404));
        }
        res.status(200).json({
            success:true,
            order,
        });
    });

// get All Orders in user account
exports.getMyOrder = catchAsyncError(
    async (req,res,next) =>{
        const orders = await Order.find({user:req.user._id});
        // if(!order){
        //     return next(new ErrorHandler("Order not found with this id",404));
        // }
        res.status(200).json({
            success:true,
            orders,
        });
    });

// get All Orders in app - admin
exports.getAllOrder = catchAsyncError(
    async (req,res,next) =>{
        const orders = await Order.find();

        let totalAmount = 0;
        orders.forEach(
            (order)=>{
                totalAmount+=order.totalPrice;
            }
        )
        
        res.status(200).json({
            success:true,
            totalAmount, 
            orders,
        });
    });

// update order Status - admin
exports.updateOrderStatus = catchAsyncError(
    async (req,res,next) =>{
        const order = await Order.findById(req.params.id);

        if(order.orderStatus === "Delivered"){
            return next(new ErrorHandler("The Order was already delivered ",400));
        }
        if(req.body.status === "Shipped"){
            order.orderItems.forEach(
                async (i_order) => {
                     await updateStock(i_order.product.toString(),i_order.quantity);
                 });
        }
       

        order.orderStatus = req.body.status;

        if(req.body.status==="Delivered"){
            order.deliveredAt = Date.now();
        }
        
        await order.save({validateBeforeSave:false});

        res.status(200).json({
            success:true,
        });
    });

async function updateStock(id,quantity){
    const product = await Product.findById(id);
    // console.log(id,product)
    product.stock -= quantity;
    await product.save({validateBeforeSave:false});
}


// delete order  - admin
exports.deleteOrder = catchAsyncError(
    async (req,res,next) =>{
        const order = await Order.findById(req.params.id);
        if(!order){
            return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`,404));
        }
        await order.remove();

        res.status(200).json({
            success:true,
        });
    });