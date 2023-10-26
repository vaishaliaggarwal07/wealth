const Commision = require('../models/CommisionRate');



const Commision_functions = {

    getCommision: async (req, res) => {
        try {
            const allCommision = await Commision.findAll();
           
            if (allCommision) {
                
                res.status(200).json(allCommision);
            } else {
                res.status(404).json( {message: 'No CommisionRate exist' });
            }
        } catch (error) {
            console.error('Error finding CommisionRate:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    updateCommision: async (req, res) => {
        try {
            const commisionId = req.params.id;
            const {
                Commission_Rate_ID,Level,Level_Abbr,Level_Description,Contract_Rate_Matrix ,Contract_Rate,Contract_Level,
                T_Override_Rate,TA_Override_Rate,A_Override_Rate,SA_Override_Rate,MD_Override_Rate,SMD_Override_Rate
               
            } = req.body;

            // Find the client by ID
            const existingCommision = await Commision.findByPk(commisionId);

            if (!existingCommision) {
                return res.status(404).json({ success: false, message: 'CommisionRate not found' });
            }

            // Update the client's information Commision
            await existingCommision.update({
                Commission_Rate_ID,Level,Level_Abbr,Level_Description,Contract_Rate_Matrix ,Contract_Rate,Contract_Level,
                T_Override_Rate,TA_Override_Rate,A_Override_Rate,SA_Override_Rate,MD_Override_Rate,SMD_Override_Rate
            });
            
            const response = {
                success: true,
                message: 'CommisionRate updated successfully',
                data: existingCommision
            };
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: error.message+'An error occurred while updating the CommisionRate' });
        }
    },

    
       
    getCommisionById:async (req, res) => {
     
        try {
            const commisionId = req.params.id; 
            const commision = await Commision.findByPk(commisionId);
            if (!commision) {
                return res.status(404).json({ success: false, message: 'CommisionRate not found' });
            }
                
            res.json(commision);
        } catch (error) {
            console.error('Error finding or CommisionRate by ID:', error);
            res.status(500).json({ success: false, message: 'An error occurred while finding CommisionRate by ID' });
        }
    }

};

module.exports = Commision_functions;

