const Category = require('../models/categoryModel');
const ErrorHandler = require('../utils/errorhanler');
const catchAsyncError = require('../middlware/catchAsyncError');


//create Category  :Admin
exports.createCategory = catchAsyncError(
    async (req,res,next) =>{
        const category = await Category.create(req.body);
        res.status(201).json({
            success:true,
            category
        });
    });

//update category: Admin
exports.updateCategory = catchAsyncError(
    async (req,res,next)=>{

        // req.body.updateBy = req.user.id;
        let category = await Category.findById(req.params.id);

        if(!category){
            return next(new ErrorHandler("Category not found",404));
    
        };
        category = await Category.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        });
        res.status(200).json({ 
            success:true,
            category
        });
    });
//delete category : Admin
exports.deleteCategory = catchAsyncError(
    async (req,res,next) =>{
        // console.log(req.params.id)
        const category = await Category.findById(req.params.id);
        if(!category){
            return next(new ErrorHandler("Category not found",404));
    
        };
        await category.remove();
        res.status(200).json({
            success:true,
            message:"Category Deleted Successfully"
        });
    });

//get all Category (Admin)
exports.getAdminCategorys = catchAsyncError(
    async (req,res,next) =>{
        
        const categories = await Category.find();

        res.status(200).json({
            success:true,
            categories,
        });
    }); 
