const Prod = require('../models/Product');


const Product_functions = { 

    getProduct: async (req, res) => {
        try {
            const allProduct= await Prod.findAll();
           
            if (allProduct) {
                
                res.status(200).json(allProduct);
            } else {
                res.status(404).json( {message: 'No Product exist' });
            }
        } catch (error) {
            console.error('Error finding Product:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const productId = req.params.id;
           
            const {
                Provider_Name,Commission_Rate_Matrix,Support_Name,Support_Phone,Product_Type,Product,Commission_Rate_1,Effective_Date_1,
                Commission_Rate_2,Effective_date_2 ,Commission_Rate_3,Effective_Date_3,Commission_Rate_4,Effective_Date_4 ,Commission_Rate5,
                Effective_Date_5
            } = req.body;
            

            // Find the client by ID
            const existingProduct = await Prod.findByPk(productId);
         
          

            if (!existingProduct) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }

            // Update the client's information Commision
            existingProduct.update({
                Provider_Name,Commission_Rate_Matrix,Support_Name,Support_Phone,Product_Type,Product,Commission_Rate_1,Effective_Date_1,
                Commission_Rate_2,Effective_date_2 ,Commission_Rate_3,Effective_Date_3,Commission_Rate_4,Effective_Date_4 ,Commission_Rate5,
                Effective_Date_5
            },
              
            );
            
            const response = {
                success: true,
                message: 'Product updated successfully',
                data: existingProduct
            };
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: error.message  +'An error occurred while updating the Product' });
        }
    },

    
       
    getProductById:async (req, res) => {
     
        try {
            const productId = req.params.id; 
            const product = await Prod.findByPk(productId);
            if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }
                
            res.json(product);
        } catch (error) {
            console.error('Error finding or Product by ID:', error);
            res.status(500).json({ success: false, message: 'An error occurred while finding Product by ID' });
        }
    }

};

module.exports =Product_functions;

