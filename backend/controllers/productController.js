const Product = require('../models/producModel');
const ErrorHandler = require('../utils/errorhanler');
const catchAsyncError = require('../middlware/catchAsyncError');
const Apifeatures = require('../utils/apifeatures');



//create Product  :Admin
exports.createProduct = catchAsyncError(
    async (req,res,next) =>{
        req.body.user = req.user.id;
        req.body.updateBy = req.user.id;
        const product = await Product.create(req.body);
        res.status(201).json({
            success:true,
            product
        });
    });

//update product: Admin
exports.updateproduct = catchAsyncError(
    async (req,res,next)=>{
        req.body.updateBy = req.user.id;
        let product = Product.findById(req.params.id);
        if(!product){
            // return res.status(500).json({
            //     success:false,
            //     message:"product not found"
            // })
            return next(new ErrorHandler("product not found",404));
    
        };
        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        });
        res.status(200).json({ 
            success:true,
            product
        });
    });
//delete product : Admin
exports.deleteProduct = catchAsyncError(
    async (req,res,next) =>{
        // console.log(req.params.id)
        const product = await Product.findById(req.params.id);
        if(!product){
            // return res.status(500).json({
            //     success:false,
            //     message:"Product not found"
            // })
            return next(new ErrorHandler("product not found",404));
    
        };
        await product.remove();
        res.status(200).json({
            success:true,
            message:"Product Deleted Successfully"
        });
    });

//get products details
exports.getProductDetails = catchAsyncError(
    async (req,res,next) =>{
        const product = await Product.findById(req.params.id);
    
        if(!product){
            // return res.status(500).json({
            //     success:false,
            //     message:"Product not found"
            // })
            return next(new ErrorHandler("product not found",404));
    
        };
        res.status(200).json({
            success:true,
            product
        });
    
    });


//get all product
exports.getAllProducts = catchAsyncError(
    async (req,res,next) =>{
        const resultPerPage = 10;
        const productsCount = await Product.countDocuments();

        // console.log(req.query);
        const apifeatures = new Apifeatures(Product.find(),req.query)
        .search()
        .filter()
        
        let products = await apifeatures.query;
        let filterProductsCount = products.length;

        apifeatures.pagination(resultPerPage);
        // const products = await Product.find();
        products = await apifeatures.query.clone();

        res.status(200).json({
            success:true,
            products,
            productsCount,
            resultPerPage,
            filterProductsCount,
        });
    }); 

// create review or update review
exports.createProductReview = catchAsyncError(
    async (req,res) =>{
        const {rating,comment,productId} = req.body;
        const review = {
            user:req.user._id,
            name:req.user.name,
            rating:Number(rating),
            comment,
        }
        const product = await Product.findById(productId);
        console.log(productId,product)
        const isReviewed = product.reviews.find(rev => rev.user.toString()===req.user._id.toString())
        if(isReviewed){
            product.reviews.forEach(
                (rev) => {
                if(rev.user.toString()===req.user._id.toString())
                    (rev.rating=rating),(rev.comment=comment);
                
            });

        }else{
            product.reviews.push(review);
            product.numofreview = product.reviews.length;
        }
        let avg = 0;
        product.reviews.forEach(
            (rev) => {
                avg +=rev.rating
            }) 
        product.ratings = avg /  product.reviews.length;
        await product.save({validateBeforeSave:false});
        res.status(200).json({
            success:true
        })
    })


// get all review
exports.getAllReview = catchAsyncError(
    async (req,res) =>{
        const product = await Product.findById(req.query.productId);
        if(!product){
            return next(new ErrorHandler("product not found",404));
        };
        res.status(200).json({
            success:true,
            reviews:product.reviews,
        });
    }); 
// delete review
exports.deleteReview = catchAsyncError(
    async (req,res) =>{
        const product = await Product.findById(req.query.productId);
        if(!product){
            return next(new ErrorHandler("product not found",404));
        };
        const reviews = product.reviews.filter(rev => rev._id.toString()===req.query.id.toString());
        
        let avg = 0;
        reviews.forEach(
            (rev) => {
                avg +=rev.rating
            }) 
        const ratings = avg / reviews.length;
        const numofreview= reviews.length;
        // await product.save({validateBeforeSave:false});
        await Product.findByIdAndUpdate(req.query.productId,{
            reviews,
            ratings,
            numofreview
        },{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        res.status(200).json({
            success:true
        })
    })
