const Goal = require('../models/Goal');



const Goal_functions = {

    getGoal: async (req, res) => {
        try {
            const allGoal = await Goal.findAll();
           
            if (allGoal) {
                
                res.status(200).json(allGoal);
            } else {
                res.status(404).json( {message: 'No GoalType exist' });
            }
        } catch (error) {
            console.error('Error finding GoalType:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    updateGoal: async (req, res) => {
        try {
            const goalId = req.params.id;
            const {
                Goal_Type,Goal_Category,Cohort,Start_Date,Rolling_Target_End_Date,_3Month_Rolling_Target_End_Date,
                _6Month_Rolling_Target_End_Date,_12Month_Rolling_End_Date,Contest_End_Date,
                Personal_Life_License_Target,Personal_Health_License_Target,Personal_Recruits_Target,
                Personal_Apps_Target,Personal_Points_Target,Personal_Field_Training_Appointments,
                Base_New_Recruits_Target,Base_Life_Licensed_Agents_Target,
                Base_Direct_Agents_Target,Base_Sr_Direct_Agents_Target,Base_Apps_Target ,Base_Points_Target,
                Base_to_1st_Gen_New_Recruits_Target,Base_to_1st_Gen_Net_Recruits_Target,
                Base_to_1st_Gen_SMDs_Target,Base_to_1st_Gen_Net_Points_Target_6_months,
                Base_to_1st_Gen_Net_Points_Target_12_months,Cash_Flow_3_Month_Target,Cash_Flow_6_Month_Target,
                Cash_Flow_12_Month_Target,Cash_Flow_Growth_Target 
                    
               
            } = req.body;

            // Find the client by ID
            const existingGoal = await Goal.findByPk(goalId);

            if (!existingGoal) {
                return res.status(404).json({ success: false, message: 'GoalType not found' });
            }

            // Update the client's information Goal
            await existingGoal.update({
                Goal_Type,Goal_Category,Cohort,Start_Date,Rolling_Target_End_Date,_3Month_Rolling_Target_End_Date,
                _6Month_Rolling_Target_End_Date,_12Month_Rolling_End_Date,Contest_End_Date,
                Personal_Life_License_Target,Personal_Health_License_Target,Personal_Recruits_Target,
                Personal_Apps_Target,Personal_Points_Target,Personal_Field_Training_Appointments,
                Base_New_Recruits_Target,Base_Life_Licensed_Agents_Target,
                Base_Direct_Agents_Target,Base_Sr_Direct_Agents_Target,Base_Apps_Target ,Base_Points_Target,
                Base_to_1st_Gen_New_Recruits_Target,Base_to_1st_Gen_Net_Recruits_Target,
                Base_to_1st_Gen_SMDs_Target,Base_to_1st_Gen_Net_Points_Target_6_months,
                Base_to_1st_Gen_Net_Points_Target_12_months,Cash_Flow_3_Month_Target,Cash_Flow_6_Month_Target,
                Cash_Flow_12_Month_Target,Cash_Flow_Growth_Target 
                    
            });
            
            const response = {
                success: true,
                message: 'GoalType updated successfully',
                data: existingGoal
            };
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: error.message+'An error occurred while updating the GoalType' });
        }
    },

    
       
    getGoalById:async (req, res) => {
     
        try {
            const goalId = req.params.id; 
            const goal = await Goal.findByPk(goalId);
            if (!goal) {
                return res.status(404).json({ success: false, message: 'GoalType not found' });
            }
                
            res.json(goal);
        } catch (error) {
            console.error('Error finding or GoalType by ID:', error);
            res.status(500).json({ success: false, message: 'An error occurred while finding GoalType by ID' });
        }
    }

};

module.exports = Goal_functions;

