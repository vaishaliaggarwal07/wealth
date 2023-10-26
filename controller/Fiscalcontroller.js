

const Fiscal= require('../models/FiscalCalendar');





const Fiscal_functions = {

    getFiscal: async (req, res) => {
        try {
            const allFiscal = await Fiscal.findAll();
           
            if (allFiscal) {
                
                res.status(200).json(allFiscal);
            } else {
                res.status(404).json( {message: 'No FiscalCalender exist' });
            }
        } catch (error) {
            console.error('Error finding FiscalCalender:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    updateFiscal: async (req, res) => {
        try {
            const fiscalId = req.params.id;
            const {
                Calendar_Date,Day_Num,Week_Num,Month_Num,Quarter_Num,Month_Name,Year,Month_Year,Quarter_Year,Pay_Cycle,
                Fiscal_Month,Fiscal_Quarter,Fiscal_Year,HI_Qual_Period,NLA_GA_Qual_Period,Tiger_Qual_Period
               
               } = req.body;
        

            // Find the client by ID
            const existingFiscal = await Fiscal.findByPk(fiscalId);
          

            if (!existingFiscal) {
                return res.status(404).json({ success: false, message: 'FiscalCalender not found' });
            }

            // Update the client's information Commision
            await existingFiscal.update({
                Calendar_Date,Day_Num,Week_Num,Month_Num,Quarter_Num,Month_Name,Year,Month_Year,Quarter_Year,Pay_Cycle,
                Fiscal_Month,Fiscal_Quarter,Fiscal_Year,HI_Qual_Period,NLA_GA_Qual_Period,Tiger_Qual_Period
               
            });
            
            const response = {
                success: true,
                message: 'FiscalCalender updated successfully',
                data: existingFiscal
            };
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: error.message+ 'An error occurred while updating the FiscalCalender' });
        }
    },

    
       
    getFiscalById:async (req, res) => {
     
        try {
            const fiscalId = req.params.id; 
            const fiscal= await Fiscal.findByPk(fiscalId);
            if (!fiscal) {
                return res.status(404).json({ success: false, message: 'FiscalCalender not found' });
            }
                
            res.json(fiscal);
        } catch (error) {
            console.error('Error finding or FiscalCalender by ID:', error);
            res.status(500).json({ success: false, message: 'An error occurred while finding FiscalCalender by ID' });
        }
    }

};

module.exports = Fiscal_functions;

