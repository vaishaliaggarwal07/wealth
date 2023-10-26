const Sale = require('../models/Sale');



const Sale_functions = { 

 

    getSale: async (req, res) => {
        try {
            const allSale= await Sale.findAll();
           
            if (allSale) {
                
                res.status(200).json(allSale);
            } else {
                res.status(404).json( {message: 'No Sale exist' });
            }
        } catch (error) {
            console.error('Error finding Sale:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    updateSale: async (req, res) => {
        try {
            const saleId = req.params.id;
           
            const {
                Agent_Name,Goal_1,Goal_lineDate,Secondary_Goal,Prospect_Name,Prospect_Email,
                Prospect_Phone,Prospect_Notes,call_1,Text_1,Email_1,Convo_1,Appset_1,call_2,
                Text_2,Email_2,Convo_2,Appset_2,call_3,Text_3,Email_3,Convo_3,Appset_3,call_4,
                Text_4 ,Email_4,Convo_4,Appset_4,call_5,Text_5,Email_5,Convo_5,Appset_5,call_6,
                Text_6,Email_6,Convo_6,Appset_6,Field_Trainer,Appt_Done,Disposition,Recruit,
                Referral,Points,Earnings,Created_by,IsConverted
                   
            } = req.body;
            

            // Find the client by ID
            const existingSale = await Sale.findByPk(saleId);
         
          

            if (!existingSale) {
                return res.status(404).json({ success: false, message: 'Sale not found' });
            }

            // Update the client's information Commision
            existingSale.update({
                Agent_Name,Goal_1,Goal_lineDate,Secondary_Goal,Prospect_Name,Prospect_Email,
                Prospect_Phone,Prospect_Notes,call_1,Text_1,Email_1,Convo_1,Appset_1,call_2,
                Text_2,Email_2,Convo_2,Appset_2,call_3,Text_3,Email_3,Convo_3,Appset_3,call_4,
                Text_4 ,Email_4,Convo_4,Appset_4,call_5,Text_5,Email_5,Convo_5,Appset_5,call_6,
                Text_6,Email_6,Convo_6,Appset_6,Field_Trainer,Appt_Done,Disposition,Recruit,
                Referral,Points,Earnings,Created_by,IsConverted
   
            },
              
            );
            
            const response = {
                success: true,
                message: 'Sale updated successfully',
                data: existingSale
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
                      return `The data in ${columnName} is too long.`; // Handle cases where maxSize is not available
                    }
                  });
                  function getMaxSizeForColumn(columnName) {
                    const char10=['call_1','Text_1','Email_1','Convo_1','Appset_1','call_2','Text_2','Email_2','Convo_2',
                    'Appset_2','call_3','Text_3','Email_3','Convo_3','Appset_3','call_4','Text_4','Email_4',
                    'Convo_4','Appset_4','call_5','Text_5','Email_5','Convo_5','Appset_5','call_6','Text_6',
                    'Email_6','Convo_6','Appset_6','Appt_Done','IsConverted'];
                    const char255=['Agent_Name','Goal_1','Goal_lineDate','Secondary_Goal','Prospect_Name',
                    'Prospect_Email','Prospect_Phone','Field_Trainer','Disposition','Recruit',
                    'Referral','Point','Earnings']
 
                    if (char10.includes(columnName)) {
                      return 1;
                    } else if (char255.includes(columnName)) {
                      return 255;
                    } else if(columnName==='Prospect_Notes'){
                        return 1000;
                    }
                    else {
                      return null; 
                    }
                  }
                  res.status(500).json({message:columnErrorMessages.join(' ')});
            
                }
                }
            res.status(500).json({ message: error.message + ' An error occurred while creating the Sales' })

      }
    },

                                

    
       
    getSaleById:async (req, res) => {
     
        try {
            const saleId = req.params.id; 
            const sale = await Sale.findByPk(saleId);
            if (!sale) {
                return res.status(404).json({ success: false, message: 'Sale not found' });
            }
                
            res.json(sale);
        } catch (error) {
            console.error('Error finding or Sale by ID:', error);
            res.status(500).json({ success: false, message: 'An error occurred while finding Sale by ID' });
        }
    },
   createSale:async (req, res) => {
    const dataArray = req.body.data;
    const resulterror = [];
    try{
      for (let index = 0; index < dataArray.length; index++) {
        const data = dataArray[index]; // Declare 'data' here
        const id =  data.CallTracker_ID;
        let bool=true
        //const value=new Date()
       
          const propertyNames = Object.keys(data);
          const Flag=data.Flag.toLowerCase()
        
          const char10=['call_1','Text_1','Email_1','Convo_1','Appset_1','call_2','Text_2','Email_2','Convo_2',
          'Appset_2','call_3','Text_3','Email_3','Convo_3','Appset_3','call_4','Text_4','Email_4',
          'Convo_4','Appset_4','call_5','Text_5','Email_5','Convo_5','Appset_5','call_6','Text_6',
          'Email_6','Convo_6','Appset_6','Appt_Done','IsConverted'];
          const char255=['Agent_Name','Goal_1','Goal_lineDate','Secondary_Goal','Prospect_Name',
          'Prospect_Email','Prospect_Phone','Field_Trainer','Disposition','Recruit',
          'Referral','Point','Earnings']
          
       
      
         for (const columnName of propertyNames ){
          if (char10.includes(columnName)){
            if(data[columnName].length>1){
            bool=false
            resulterror.push(`Please enter 1 char in ${columnName} where Agent_name=${data.Agent_Name},`);
            }
          }
          else if (char255.includes(columnName)){
            if(data[columnName].length>255){
            bool=false
            resulterror.push(`Please enter 255 char in ${columnName} where Agent_name= ${data.Agent_Name},`);
            }
          }
          else if(columnName==="Prospect_Notes"){
            if(data[columnName].length>1000){
              bool=false
              resulterror.push(`Please enter 1000 char in ${columnName} where Agent_name=${data.Agent_Name},`);

            }
          }
          else if (columnName === "Created_by") {
            //const datePattern = /^\d{4}-\d{2}-\d{2}$/; 
            const datePattern = /^(\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])|\d{4})$/;// Regular expression for "YYYY-MM-DD" format
            if (!datePattern.test(data[columnName]) && data[columnName] !== undefined) {
              bool=false
              resulterror.push(`Please enter a correct date in ${columnName} where Agent_name=${data.Agent_Name},`);
            }
          }
          
        }
        
     
       
 
        
       
      if (id && Flag==="m" && bool) {
        
       
        try{
            const use=Sale.findByPk(id)
            if(use){
            
            const newsale=await Sale.update(
              { 
                Agent_Name:data.Agent_Name,
                Goal_1:data.Goal_1,
                Goal_lineDate:data.Goal_lineDate,
                Secondary_Goal:data.Secondary_Goal,
                Prospect_Name:data.Prospect_Name,
                Prospect_Email:data.Prospect_Email,
                Prospect_Phone:data.Prospect_Phone,
                Prospect_Notes:data.Prospect_Notes,
                call_1:data.call_1,
                Text_1:data.Text_1,
                Email_1:data.Email_1,
                Convo_1:data.Convo_1,
                Appset_1:data.Appset_1,
                call_2:data.call_2,
                Text_2:data.Text_2,
                Email_2:data.Email_2,
                Convo_2:data.Convo_2,
                Appset_2:data.Appset_2,
                call_3:data.call_3,
                Text_3:data.Text_3,
                Email_3:data.Email_3,
                Convo_3:data.Convo_3,
                Appset_3:data.Appset_3,
                call_4:data.call_4,
                Text_4:data.Text_4,
                Email_4:data.Email_4,
                Convo_4:data.Convo_4,
                Appset_4:data.Appset_4,
                call_5:data.call_5,
                Text_5:data.Text_5,
                Email_5:data.Email_5,
                Convo_5:data.Appset_5,
                call_6:data.call_6,
                Text_6:data.Text_6,
                Email_6:data.Email_6,
                Convo_6:data.Convo_6,
                Appset_6:data.Appset_6,
                Field_Trainer:data.Field_Trainer,
                Appt_Done:data.Appt_Done,
                Disposition:data.Disposition,
                Recruit:data.Recruit,
                Referral:data.Referral,
                Points:data.Points,
                Earnings:data.Earnings,
                Created_by:data.Created_by,
                IsConverted:data.IsConverted
              }, // Specify the new value for the 'name' field
              {
                where: { CallTracker_ID: id
                } // Define the condition to select the row(s) to update
              }
        
      
            )
            }
      
        

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
                      return `The data in ${columnName} is too long. Please edit the data length of ${maxSize} characters in the object ${index+1}.`;
                    } else {
                      return `The data in ${columnName} is too long.`; // Handle cases where maxSize is not available
                    }
                  });
                  function getMaxSizeForColumn(columnName) {
                   
                  
 
                    if (char10.includes(columnName)) {
                      return 1;
                    } else if (char255.includes(columnName)) {
                      return 255;
                    } else if(columnName==='Prospect_Notes'){
                        return 1000;
                    }
                    else {
                      return null; 
                    }
                  }
                  res.status(500).json({message:columnErrorMessages.join(' ')});
            
                }
                }
            res.status(500).json({ message: error.message + ' An error occurred while creating the Sales' })
*/
      }
    }
    else if (id && Flag==="d" && bool){
      try{
        const del=Sale.findByPk(id)
        if(del){
       
        await Sale.update({
          IsActive:'N'
        },
        {
          where:{CallTracker_ID:id}
        }
        )
      }
      }
      catch(err){
        resulterror.push("Error occuring in deletion")
      }

    }
    else if(Flag==="i" && bool){
      try{
                
        
      const newSale=await Sale.create({ 
        Agent_Name:data.Agent_Name,
                Goal_1:data.Goal_1,
                Goal_lineDate:data.Goal_lineDate,
                Secondary_Goal:data.Secondary_Goal,
                Prospect_Name:data.Prospect_Name,
                Prospect_Email:data.Prospect_Email,
                Prospect_Phone:data.Prospect_Phone,
                Prospect_Notes:data.Prospect_Notes,
                call_1:data.call_1,
                Text_1:data.Text_1,
                Email_1:data.Email_1,
                Convo_1:data.Convo_1,
                Appset_1:data.Appset_1,
                call_2:data.call_2,
                Text_2:data.Text_2,
                Email_2:data.Email_2,
                Convo_2:data.Convo_2,
                Appset_2:data.Appset_2,
                call_3:data.call_3,
                Text_3:data.Text_3,
                Email_3:data.Email_3,
                Convo_3:data.Convo_3,
                Appset_3:data.Appset_3,
                call_4:data.call_4,
                Text_4:data.Text_4,
                Email_4:data.Email_4,
                Convo_4:data.Convo_4,
                Appset_4:data.Appset_4,
                call_5:data.call_5,
                Text_5:data.Text_5,
                Email_5:data.Email_5,
                Convo_5:data.Appset_5,
                call_6:data.call_6,
                Text_6:data.Text_6,
                Email_6:data.Email_6,
                Convo_6:data.Convo_6,
                Appset_6:data.Appset_6,
                Field_Trainer:data.Field_Trainer,
                Appt_Done:data.Appt_Done,
                Disposition:data.Disposition,
                Recruit:data.Recruit,
                Referral:data.Referral,
                Points:data.Points,
                Earnings:data.Earnings,
                Created_by:data.Created_by,
                IsConverted:data.IsConverted
        
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
          return `The data in ${columnName} is too long. Please enter the data length of ${maxSize} characters in the object ${index+1}`;
        } else {
          return `The data in ${columnName} is too long.`; // Handle cases where maxSize is not available
        }
      });
      function getMaxSizeForColumn(columnName) {
        const char10=['call_1','Text_1','Email_1','Convo_1','Appset_1','call_2','Text_2','Email_2','Convo_2',
        'Appset_2','call_3','Text_3','Email_3','Convo_3','Appset_3','call_4','Text_4','Email_4',
        'Convo_4','Appset_4','call_5','Text_5','Email_5','Convo_5','Appset_5','call_6','Text_6',
        'Email_6','Convo_6','Appset_6','Appt_Done','IsConverted'];
        const char255=['Agent_Name','Goal_1','Goal_lineDate','Secondary_Goal','Prospect_Name',
        'Prospect_Email','Prospect_Phone','Field_Trainer','Disposition','Recruit',
        'Referral','Point','Earnings']

        if (char10.includes(columnName)) {
          return 1;
        } else if (char255.includes(columnName)) {
          return 255;
        } else if(columnName==='Prospect_Notes'){
            return 1000;
        }
        else {
          return null; 
        }
      }
      res.status(500).json({message:columnErrorMessages.join(' ')});

    }
    }

   
  return res.status(500).json({ message: error.message + ' An error occurred while creating the Agent' })

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

module.exports =Sale_functions;

