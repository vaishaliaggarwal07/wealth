const {User,Role} = require('../models/user');

const jwt = require("jsonwebtoken");
const catchAsync = require('../utils/catchAsync');
const User_functions = { 

 

    getUser: async (req, res) => {
        try {
            const allUser= await User.findAll();
           
            if (allUser) {
                
                res.status(200).json(allUser);
            } else {
                res.status(404).json( {message: 'No User exist' });
            }
        } catch (error) {
            console.error('Error finding User:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
           
            const {
                email,password,First_name,Last_name,BaseShopID,Mobileno
            } = req.body;
            

            // Find the client by ID
            const existingUser = await User.findByPk(userId);
         
          

            if (!existingUser) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            // Update the client's information Commision
            existingUser.update({
                email,password,First_name,Last_name,BaseShopID,Mobileno
            },
              
            );
            
            const response = {
                success: true,
                message: 'User updated successfully',
                data: existingUser
            };
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message:error.message+'An error occurred while updating the User' });
        }
    },

    
       
    getUserById:async (req, res) => {
     
        try {
            const userId = req.params.id; 
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
                
            res.json(user);
        } catch (error) {
            console.error('Error finding or User by ID:', error);
            res.status(500).json({ success: false, message: 'An error occurred while finding User by ID' });
        }
    },
  
   
    deleteUser: async (req, res) => { 
        try {
            const id = req.params.id;
           
            const deletedCount = await User.destroy({
                where: {id: id }
            });
            if (deletedCount === 0) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            
            res.json({ success: true, message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting User:', error);
            res.status(500).json({ success: false, message: error.message+'An error occurred while deleting the User' });
        }
    },

    

};

module.exports =User_functions;

