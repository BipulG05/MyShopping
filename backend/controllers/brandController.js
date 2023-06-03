const Brand = require('../models/brandModel');
const ErrorHandler = require('../utils/errorhanler');
const catchAsyncError = require('../middlware/catchAsyncError');


//create Brand  :Admin
exports.createBrand = catchAsyncError(
    async (req,res,next) =>{
        const brand = await Brand.create(req.body);
        res.status(201).json({
            success:true,
            brand
        });
    });

//update brand: Admin
exports.updateBrand = catchAsyncError(
    async (req,res,next)=>{

        // req.body.updateBy = req.user.id;
        let brand = await Brand.findById(req.params.id);

        if(!brand){
            return next(new ErrorHandler("Brand not found",404));
    
        };
        brand = await Brand.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        });
        res.status(200).json({ 
            success:true,
            brand
        });
    });
//delete brand : Admin
exports.deleteBrand = catchAsyncError(
    async (req,res,next) =>{
        const brand = await Brand.findById(req.params.id);
        if(!brand){
            return next(new ErrorHandler("Brand not found",404));
    
        };
        await brand.remove();
        res.status(200).json({
            success:true,
            message:"Brand Deleted Successfully"
        });
    });

//get all Brand (Admin)
exports.getAdminBrands = catchAsyncError(
    async (req,res,next) =>{
        
        const Brands = await Brand.find();

        res.status(200).json({
            success:true,
            Brands,
        });
    }); 
