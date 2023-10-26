const Under = require('../models/Under');



const Under_functions = { 

 

    getUnder: async (req, res) => {
        try {
            const allUnder= await Under.findAll();
           
            if (allUnder) {
                
                res.status(200).json(allUnder);
            } else {
                res.status(404).json( {message: 'No Under exist' });
            }
        } catch (error) {
            console.error('Error finding Under:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    updateUnder: async (req, res) => {
        try {
            const underId = req.params.id;
           
            const {
                ClientInformation_Owner,Insured,Recruit_Client,Client_State,Application_Status,
                Date_Submitted,Pay_Cycle,Notes,Policy_No,Policy_Provider,Product,Paramed,
                Issue_Date,Renewal_Date,Target_Premium,Commission_Rate,Split_Sale,Gross_Points,
                Net_Points,WritingAgent_Name,WritingAgent_Contract_Level,WritingAgent_Split,
                WritingAgent_Net_Points_Allocation, WritingAgent_Commission,SplitAgent1_Name_1,
                SplitAgent1_Contract_Level,SplitAgent1_Split,SplitAgent1_Net_Points_Allocation,
                SplitAgent1_Commission,SplitAgent2_Name_2,SplitAgent2_Contract_Level,
                SplitAgent2_Split,SplitAgent2_Net_Points_Allocation,SplitAgent2_Commission,
                Level_1,Associate_Overrides_to_1,Associate_Overrides_to_2,Overrides_1,Overrides_2,
                MD_Overrides_1,MD_Overrides_2,SMD_Overrides_1,SMD_Overrides_2,Total_Overrides_1,
                Total_Overrides_2,Level_2,Associate_Overrides_to_3,Associate_Overrides_to_4,
                Overrides_3,Overrides_4,MD_Overrides_3,MD_Overrides_4,SMD_Overrides_3,
                SMD_Overrides_4,Total_Overrides_3,Total_Overrides_4,Level_3 ,
                Associate_Overrides_to_5,Associate_Overrides_to_6,Overrides_5,Overrides_6,
                MD_Overrides_5,MD_Overrides_6,SMD_Overrides_5,SMD_Overrides_6,Total_Overrides_5,
                Total_Overrides_6
                   
            } = req.body;
            

            // Find the client by ID
            const existingUnder = await Under.findByPk(underId);
         
          

            if (!existingUnder) {
                return res.status(404).json({ success: false, message: 'Under not found' });
            }

            // Update the client's information Commision
            existingUnder.update({
                ClientInformation_Owner,Insured,Recruit_Client,Client_State,Application_Status,
                Date_Submitted,Pay_Cycle,Notes,Policy_No,Policy_Provider,Product,Paramed,
                Issue_Date,Renewal_Date,Target_Premium,Commission_Rate,Split_Sale,Gross_Points,
                Net_Points,WritingAgent_Name,WritingAgent_Contract_Level,WritingAgent_Split,
                WritingAgent_Net_Points_Allocation, WritingAgent_Commission,SplitAgent1_Name_1,
                SplitAgent1_Contract_Level,SplitAgent1_Split,SplitAgent1_Net_Points_Allocation,
                SplitAgent1_Commission,SplitAgent2_Name_2,SplitAgent2_Contract_Level,
                SplitAgent2_Split,SplitAgent2_Net_Points_Allocation,SplitAgent2_Commission,
                Level_1,Associate_Overrides_to_1,Associate_Overrides_to_2,Overrides_1,Overrides_2,
                MD_Overrides_1,MD_Overrides_2,SMD_Overrides_1,SMD_Overrides_2,Total_Overrides_1,
                Total_Overrides_2,Level_2,Associate_Overrides_to_3,Associate_Overrides_to_4,
                Overrides_3,Overrides_4,MD_Overrides_3,MD_Overrides_4,SMD_Overrides_3,
                SMD_Overrides_4,Total_Overrides_3,Total_Overrides_4,Level_3 ,
                Associate_Overrides_to_5,Associate_Overrides_to_6,Overrides_5,Overrides_6,
                MD_Overrides_5,MD_Overrides_6,SMD_Overrides_5,SMD_Overrides_6,Total_Overrides_5,
                Total_Overrides_6
                   
            },
              
            );
            
            const response = {
                success: true,
                message: 'Under updated successfully',
                data: existingUnder
            };
            res.json(response);
        } catch (error) {
            if (error.name === 'SequelizeDatabaseError') {
                
                if (error.message.includes("String or binary data would be truncated")) {
                  const columnMatches = error.message.match(/column '(.*?)'/g);
                  const columnNames = columnMatches
                    ? columnMatches.map(match => match.replace(/column '|'/g, ''))
                    : ['unknown column'];
            
                  
                  const columnErrorMessages = columnNames.map(columnName => {
                    const maxSize =getMaxSizeForColumn(columnName)
            
                    if (maxSize) {
                      return `The data in ${columnName} is too long. Please enter the data length of ${maxSize} characters.`;
                    } else {
                      return `The data in ${columnName} is too long.`; 
                    }
                  });
                  function getMaxSizeForColumn(columnName) {
                   if(columnName==='Notes'){
                        return 500;
                    }else {
                      return 255; 
                    }
                  }
                  res.status(500).json({message:columnErrorMessages.join(' ')});
            
                }
                }
            res.status(500).json({ message: error.message + ' An error occurred while creating the Underwriting' })

      }
    },
    
       
    getUnderById:async (req, res) => {
     
        try {
            const underId = req.params.id; 
            const under = await Under.findByPk(underId);
            if (!under) {
                return res.status(404).json({ success: false, message: 'Under not found' });
            }
                
            res.json(under);
        } catch (error) {
            console.error('Error finding or Under by ID:', error);
            res.status(500).json({ success: false, message: 'An error occurred while finding Under by ID' });
        }
    },
   createUnder:async (req, res) => {
    const dataArray = req.body.data;
    const resulterror = [];
        try {
          for (let index = 0; index < dataArray.length; index++) {
            const data = dataArray[index]; // Declare 'data' here
            const id =  data.Underwriting_ID;
            let bool=true
             
                const propertyNames = Object.keys(data);
                const Flag=data.Flag.toLowerCase()
              
            
               for (const columnName of propertyNames ){
                if (columnName==="Notes"){
                  if(data[columnName].length>500){
                  bool=false
                  resulterror.push(`Please enter 500 char in ${columnName} where ClientInformation_Owner=${data.ClientInformation_Owner},`);
                  }
                }
                else{
                  if(data[columnName].length>255){
                  bool=false
                  resulterror.push(`Please enter 255 char in ${columnName} where ClientInformation_Owner=${data.ClientInformation_Owner},`);
                  }
                }
              }
            //results.push(id);
             
            if (id && Flag==="m" && bool) {
              try{
               
                  
                  const newunder=await Under.update(
                    {
                    ClientInformation_Owner:data.ClientInformation_Owner,
                    Insured:data.Insured,
                    Recruit_Client:data.Recruit_Client,
                    Client_State:data.Client_State,
                    Application_Status:data.Application_Status,
                Date_Submitted:data.Date_Submitted,
                Pay_Cycle:data.Pay_Cycle,
                Notes:data.Notes,
                Policy_No:data.Policy_No,
                Policy_Provider:data.Policy_Provider,
                Product:data.Product,
                Paramed:data.Paramed,
                Issue_Date:data.Issue_Date,
                Renewal_Date:data.Renewal_Date,
                Target_Premium:data.Target_Premium,
                Commission_Rate:data.Commission_Rate,
                Split_Sale:data.Split_Sale,
                Gross_Points:data.Gross_Points,
                Net_Points:data.Net_Points,
                WritingAgent_Name:data.WritingAgent_Name,
                WritingAgent_Contract_Level:data.WritingAgent_Contract_Level,
                WritingAgent_Split:data.WritingAgent_Split,
                WritingAgent_Net_Points_Allocation:data.WritingAgent_Net_Points_Allocation,
                WritingAgent_Commission:data.WritingAgent_Commission,
                SplitAgent1_Name_1:data.SplitAgent1_Commission,
                SplitAgent1_Contract_Level:data.SplitAgent1_Contract_Level,
                SplitAgent1_Split:data.SplitAgent1_Split,
                SplitAgent1_Net_Points_Allocation:data.SplitAgent1_Net_Points_Allocation,
                SplitAgent1_Commission:data.SplitAgent1_Commission,
                SplitAgent2_Name_2:data.SplitAgent2_Name_2,
                SplitAgent2_Contract_Level:data.SplitAgent2_Contract_Level,
                SplitAgent2_Split:data.SplitAgent2_Split,
                SplitAgent2_Net_Points_Allocation:data.SplitAgent2_Net_Points_Allocation,
                SplitAgent2_Commission:data.SplitAgent2_Commission,
                Level_1:data.Level_1,
                Associate_Overrides_to_1:data.Associate_Overrides_to_1,
                Associate_Overrides_to_2:data.Associate_Overrides_to_2,
                Overrides_1:data.Overrides_1,
                Overrides_2:data.Overrides_2,
                MD_Overrides_1:data.MD_Overrides_1,
                MD_Overrides_2:data.MD_Overrides_2,
                SMD_Overrides_1:data.SMD_Overrides_1,
                SMD_Overrides_2:data.SMD_Overrides_2,
                Total_Overrides_1:data.Total_Overrides_1,
                Total_Overrides_2:data.Total_Overrides_2,
                Level_2:data.Level_2,
                Associate_Overrides_to_3:data.Associate_Overrides_to_3,
                Associate_Overrides_to_4:data.Associate_Overrides_to_4,
                Overrides_3:data.Overrides_3,
                Overrides_4:data.Overrides_4,
                MD_Overrides_3:data.MD_Overrides_3,
                MD_Overrides_4:data.MD_Overrides_4,
                SMD_Overrides_3:data.SMD_Overrides_3,
                SMD_Overrides_4:data.SMD_Overrides_4,
                Total_Overrides_3:data.Total_Overrides_3,
                Total_Overrides_4:data.Total_Overrides_4,
                Level_3 :data.Level_3,
                Associate_Overrides_to_5:data.Associate_Overrides_to_5,
                Associate_Overrides_to_6:data.Associate_Overrides_to_6,
                Overrides_5:data.Overrides_5,
                Overrides_6:data.Overrides_6,
                MD_Overrides_5:data.MD_Overrides_5,
                MD_Overrides_6:data.MD_Overrides_6,
                SMD_Overrides_5:data.SMD_Overrides_5,
                SMD_Overrides_6:data.SMD_Overrides_6,
                Total_Overrides_5:data.Total_Overrides_5,
                Total_Overrides_6:data.Total_Overrides_6
                    }, // Specify the new value for the 'name' field
                    {
                      where: { Underwriting_ID: id
                      } // Define the condition to select the row(s) to update
                    }
              
            
              );
            
                  }

              
              catch (error) {
                /*
                if (error.name === 'SequelizeDatabaseError') {
                
                  if (error.message.includes("String or binary data would be truncated")) {
                    const columnMatches = error.message.match(/column '(.*?)'/g);
                    const columnNames = columnMatches
                      ? columnMatches.map(match => match.replace(/column '|'/g, ''))
                      : ['unknown column'];
              
                    
                    const columnErrorMessages = columnNames.map(columnName => {
                      const maxSize =getMaxSizeForColumn(columnName)
              
                      if (maxSize) {
                        return `The data in ${columnName} is too long. Please edit the data length of ${maxSize} characters -object ${index+1}`;
                      } else {
                        return `The data in ${columnName} is too long.`; 
                      }
                    });
                    function getMaxSizeForColumn(columnName) {
                     if(columnName==='Notes'){
                          return 500;
                      }else {
                        return 255; 
                      }
                    }
                    res.status(500).json({message:columnErrorMessages.join(' ')});
              
                  }
                  }

              
                     
               

           
                return res.status(500).json({ message: error.message+ ' An error occurred while updating the Agent' })
                */
              }
              
           

            
             } 
             else if (id && Flag==="d" && bool){
              try{
                await Under.update({
                  IsActive:'N'
                },
                {
                  where:{Underwriting_ID:id}
                }
                )
              }
              catch(err){
                return res.status(500).send("Error occuring in deletion")
              }
        
            }
            else if(Flag==="i" && bool) {
              try{
                
             
    
              const newAgent=await Under.create({ 
                ClientInformation_Owner:data.ClientInformation_Owner,
                Insured:data.Insured,
                Recruit_Client:data.Recruit_Client,
                Client_State:data.Client_State,
                Application_Status:data.Application_Status,
            Date_Submitted:data.Date_Submitted,
            Pay_Cycle:data.Pay_Cycle,
            Notes:data.Notes,
            Policy_No:data.Policy_No,
            Policy_Provider:data.Policy_Provider,
            Product:data.Product,
            Paramed:data.Paramed,
            Issue_Date:data.Issue_Date,
            Renewal_Date:data.Renewal_Date,
            Target_Premium:data.Target_Premium,
            Commission_Rate:data.Commission_Rate,
            Split_Sale:data.Split_Sale,
            Gross_Points:data.Gross_Points,
            Net_Points:data.Net_Points,
            WritingAgent_Name:data.WritingAgent_Name,
            WritingAgent_Contract_Level:data.WritingAgent_Contract_Level,
            WritingAgent_Split:data.WritingAgent_Split,
            WritingAgent_Net_Points_Allocation:data.WritingAgent_Net_Points_Allocation,
            WritingAgent_Commission:data.WritingAgent_Commission,
            SplitAgent1_Name_1:data.SplitAgent1_Commission,
            SplitAgent1_Contract_Level:data.SplitAgent1_Contract_Level,
            SplitAgent1_Split:data.SplitAgent1_Split,
            SplitAgent1_Net_Points_Allocation:data.SplitAgent1_Net_Points_Allocation,
            SplitAgent1_Commission:data.SplitAgent1_Commission,
            SplitAgent2_Name_2:data.SplitAgent2_Name_2,
            SplitAgent2_Contract_Level:data.SplitAgent2_Contract_Level,
            SplitAgent2_Split:data.SplitAgent2_Split,
            SplitAgent2_Net_Points_Allocation:data.SplitAgent2_Net_Points_Allocation,
            SplitAgent2_Commission:data.SplitAgent2_Commission,
            Level_1:data.Level_1,
            Associate_Overrides_to_1:data.Associate_Overrides_to_1,
            Associate_Overrides_to_2:data.Associate_Overrides_to_2,
            Overrides_1:data.Overrides_1,
            Overrides_2:data.Overrides_2,
            MD_Overrides_1:data.MD_Overrides_1,
            MD_Overrides_2:data.MD_Overrides_2,
            SMD_Overrides_1:data.SMD_Overrides_1,
            SMD_Overrides_2:data.SMD_Overrides_2,
            Total_Overrides_1:data.Total_Overrides_1,
            Total_Overrides_2:data.Total_Overrides_2,
            Level_2:data.Level_2,
            Associate_Overrides_to_3:data.Associate_Overrides_to_3,
            Associate_Overrides_to_4:data.Associate_Overrides_to_4,
            Overrides_3:data.Overrides_3,
            Overrides_4:data.Overrides_4,
            MD_Overrides_3:data.MD_Overrides_3,
            MD_Overrides_4:data.MD_Overrides_4,
            SMD_Overrides_3:data.SMD_Overrides_3,
            SMD_Overrides_4:data.SMD_Overrides_4,
            Total_Overrides_3:data.Total_Overrides_3,
            Total_Overrides_4:data.Total_Overrides_4,
            Level_3 :data.Level_3,
            Associate_Overrides_to_5:data.Associate_Overrides_to_5,
            Associate_Overrides_to_6:data.Associate_Overrides_to_6,
            Overrides_5:data.Overrides_5,
            Overrides_6:data.Overrides_6,
            MD_Overrides_5:data.MD_Overrides_5,
            MD_Overrides_6:data.MD_Overrides_6,
            SMD_Overrides_5:data.SMD_Overrides_5,
            SMD_Overrides_6:data.SMD_Overrides_6,
            Total_Overrides_5:data.Total_Overrides_5,
            Total_Overrides_6:data.Total_Overrides_6
               
              });
            
            
              }
            
         
          
            
        catch (error) {
          /*
            if (error.name === 'SequelizeDatabaseError') {
                
                if (error.message.includes("String or binary data would be truncated")) {
                  const columnMatches = error.message.match(/column '(.*?)'/g);
                  const columnNames = columnMatches
                    ? columnMatches.map(match => match.replace(/column '|'/g, ''))
                    : ['unknown column'];
            
                  
                  const columnErrorMessages = columnNames.map(columnName => {
                    const maxSize =getMaxSizeForColumn(columnName)
            
                    if (maxSize) {
                      return `The data in ${columnName} is too long. Please enter the data length of ${maxSize} characters in the object of ${index+1}`;
                    } else {
                      return `The data in ${columnName} is too long.`; 
                    }
                  });
                  function getMaxSizeForColumn(columnName) {
                   if(columnName==='Notes'){
                        return 500;
                    }else {
                      return 255; 
                    }
                  }
                  res.status(500).json({message:columnErrorMessages.join(' ')});
            
                }
                }
            res.status(500).json({ message: error.message + ' An error occurred while creating the Underwriting' })

    */       

}
}

}
if(resulterror.length>0){
  const errormessage=resulterror.join('');
  throw new Error(errormessage)
  }
  else{
   res.send("success")
  }                         
}
catch(error){
  const errorcol=error.message.slice(0,-1)
  const arrstring=errorcol.split(',')
  res.status(500).json({error:arrstring})
 

}
        
}           
       

}

module.exports =Under_functions;

