const express = require('express');
const router = express.Router();
// const uuid = require('uuid');
const multer = require('multer');
const ProductDetails = require('../Modals/Product');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', (req, res) => {
  res.json({ users: ['useraone', 'usertwo','userThrree','userFour'] });
});
router.post('/addProduct',upload.array('Images'), async(req,res)=>{
  try {
     const{
        NameofProduct,
        Description,
        Category,
        Price
     } = req.body;

     const product = new ProductDetails({
       NameOfProdut:NameofProduct,
       Description:Description,
       Images:req.files.map(file=>({
         imgname:file.originalname,
         imgdata:file.buffer.toString('base64'),
       })),
       Category:Category,
       Price:Price

     })
     await product.save();

     res.status(200).json({message:"Product upload successful"});
  } catch (error) {
    cosole.log(error);
    res.status(501).json({error:'An error occured while creating product'})
  }
})
router.get('/getAllProducts', async (req, res) => {
  try {
    // Use your Mongoose model to fetch all products from the database
    const products = await ProductDetails.find();
    
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
});
module.exports = router;