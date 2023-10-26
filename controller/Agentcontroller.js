const Agent = require('../models/Agent');



const Agent_functions = { 

        

    getAgent: async (req, res) => {
        try {
            const allAgent= await Agent.findAll();
           
            if (allAgent) {
                
                res.status(200).json(allAgent);
            } else {
                res.status(404).json( {message: 'No Agent exist' });
            }
        } catch (error) {
            console.error('Error finding Agent:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    updateAgent: async (req, res) => {
        try {
            const agentId = req.params.id;
           
            const {
                Agent_Name,Training_Associate,Upline_Agent,AMA_Date,NinetyDay_clock,Financial_Orientation,
                IsaClient,Earned1K,Course_Access,Exam_Scheduled,Date_passed,AML_Course,License_Registered,
                Resident_Number,Business_Orientation,GroupME,WealthSmyth,Agent_Agreement,MyWFG,E_O_Days,
                E_O_Paid,Platform_Fee,Direct_Deposit,Business_Launch,Eagle_Academy,Associate_Status
                   
            } = req.body;
            const Days=parseInt(E_O_Days, 10)
            
            if (isNaN(Days) ){
                res.status(500).json({message:'Please enter a valid integer in the field E_O_Days'});
              }

            // Find the client by ID
            const existingAgent = await Agent.findByPk(agentId);
         
          

            if (!existingAgent) {
                return res.status(404).json({ success: false, message: 'Agent not found' });
            }

            // Update the client's information Commision
            existingAgent.update({
                Agent_Name,Training_Associate,Upline_Agent,AMA_Date,NinetyDay_clock,Financial_Orientation,
                IsaClient,Earned1K,Course_Access,Exam_Scheduled,Date_passed,AML_Course,License_Registered,
                Resident_Number,Business_Orientation,GroupME,WealthSmyth,Agent_Agreement,MyWFG,E_O_Days:Days,
                E_O_Paid,Platform_Fee,Direct_Deposit,Business_Launch,Eagle_Academy,Associate_Status
   
            },
              
            );
            
            const response = {
                success: true,
                message: 'Agent updated successfully',
                data: existingAgent
            };
            res.json(response);
        } catch (error) {

            if (error.name === 'SequelizeDatabaseError') {
                // Check if the error message indicates data truncation
                if (error.message.includes("String or binary data would be truncated")) {
                  // Extract all column names causing the error (assuming a consistent format)
                  const columnMatches = error.message.match(/column '(.*?)'/g);
                  const columnNames = columnMatches
                    ? columnMatches.map(match => match.replace(/column '|'/g, ''))
                    : ['unknown column'];
            
                  // Create a user-friendly error message
                  const columnErrorMessages = columnNames.map(columnName => {
                    // Replace with actual code to retrieve the maxSize for this columnName
                    const maxSize =getMaxSizeForColumn(columnName)
            
                    if (maxSize) {
                      return `The data in ${columnName} is too long. Please enter the data length of ${maxSize} characters.`;
                    } else {
                      return `The data in ${columnName} is too long.`; // Handle cases where maxSize is not available
                    }
                  });
                  function getMaxSizeForColumn(columnName) {
                    const char10=['IsaClient','Earned1K','Course_Access','Exam_Scheduled','Date_passed',
                    'AML_Course','License_Registered','Resident_Number',
                    'Business_Orientation','GroupME','WealthSmyth','MyWFG','E_O_Paid','Platform_Fee','Direct_Deposit','Business_Launch',
                    'Eagle_Academy','Associate_Status'];
                    const char255=['Agent_Name','Training_Associate','Upline_Agent','AMA_Date',
                    'NinetyDay_clock','Financial_Orientation']
 
                    if (char10.includes(columnName)) {
                      return 10;
                    } else if (char255.includes(columnName)) {
                      return 255;
                    } else if(z==='Agent_Agreement'){
                        return 50;
                    }else {
                      return null; 
                    }
                  }
                  res.status(500).json({message:columnErrorMessages.join(' ')});
            
                }
                }
            res.status(500).json({ message: error.message + ' An error occurred while creating the Agent' })

      }},
                  
     

    
       
    getAgentById:async (req, res) => {
     
        try {
            const agentId = req.params.id; 
            const agent = await Agent.findByPk(agentId);
            if (!agent) {
                return res.status(404).json({ success: false, message: 'Agent not found' });
            }
                
            res.json(agent);
        } catch (error) {
            console.error('Error finding or Agent by ID:', error);
            res.status(500).json({ success: false, message: 'An error occurred while finding Agent by ID' });
        }
    },
   createAgent:async (req, res) => {
        
          const dataArray = req.body.data;
         
          let resulterror = [];
          try{
            for (let index = 0; index < dataArray.length; index++) {
              const data = dataArray[index]; // Declare 'data' here
              const id =  data.Agent_OnBoarding_ID;
              const propertyNames = Object.keys(data);
              const Flag=data.Flag.toLowerCase()
              let bool=true
             // return res.send("fla"+Flag)
              
             
              const char10=['IsaClient','Earned1K','Course_Access','Exam_Scheduled','Date_passed',
              'AML_Course','License_Registered','Resident_Number',
              'Business_Orientation','GroupME','WealthSmyth','MyWFG','E_O_Paid','Platform_Fee','Direct_Deposit','Business_Launch',
              'Eagle_Academy','Associate_Status'];
              
            const char255=['Agent_Name','Training_Associate','Upline_Agent','AMA_Date',
             'NinetyDay_clock','Financial_Orientation']
             // const lenm=data.IsaClient.length;
             for (const columnName of propertyNames ){
              if (char10.includes(columnName)){
                if(data[columnName].length>10){
                bool=false
                resulterror.push(`Please enter 10 char in ${columnName} where Training_Associate=${data.Training_Associate},`);
                }
              }
              else if (char255.includes(columnName)){
                if(data[columnName].length>255){
                bool=false
                resulterror.push(`Please enter 255 char in ${columnName}  where Training_Associate= ${data.Training_Associate},`);
                }
              }
              else if ( columnName==="E_O_Days" && isNaN(parseInt(data.E_O_Days, 10)) && data.E_O_Days!=undefined){
                bool=false
                resulterror.push(`Please enter a valid integer E_O_Days  where Training_Associate= ${data.Training_Associate},`);
                
              }
            }
          
              //results.push(id);
              
             
            if (id && Flag==='m' && bool) {
              try{
                
               
                const use=Agent.findByPk(id)
              
                  if(use){
                  
                  await Agent.update(
                    { Agent_Name: data.Agent_Name ,
                      Training_Associate:data.Training_Associate,
                      Upline_Agent:data.Upline_Agent,
                      AMA_Date:data.AMA_Date,
                      NinetyDay_clock:data.NinetyDay_clock,
                      Financial_Orientation:data.Financial_Orientation,
                      IsaClient:data.IsaClient,
                      Earned1K:data.Earned1K,
                      Course_Access:data.Course_Access,
                      Exam_Scheduled:data.Exam_Scheduled,
                      Date_passed:data.Date_passed,
                      AML_Course:data.AML_Course,
                      License_Registered:data.License_Registered,
                      Resident_Number:data.Resident_Number,
                      Business_Orientation:data.Business_Orientation,
                      GroupME:data.GroupME,
                      WealthSmyth:data.WealthSmyth,
                      Agent_Agreement:data.Agent_Agreement,
                      MyWFG:data.MyWFG,
                      E_O_Days:data.E_O_Days,
                      E_O_Paid:data.E_O_Paid,
                      Platform_Fee:data.Platform_Fee,
                      Direct_Deposit:data.Direct_Deposit,
                      Business_Launch:data.Business_Launch,
                      Eagle_Academy:data.Eagle_Academy,
                      Associate_Status:data.Associate_Status
                    }, // Specify the new value for the 'name' field
                    {
                      where: { Agent_OnBoarding_ID: id
                      } // Define the condition to select the row(s) to update
                    }
                  
              
            
              );
                  }
            
              

              }
              catch (error) {
              /*
                if (isNaN(parseInt(data.E_O_Days, 10))){
                  resulterror.push(`please enter enter in EODAYS in agent name ${data.Agent_Name},`)
                }
                

               if (error.name === 'SequelizeDatabaseError') {
                
                  // Check if the error message indicates data truncation
                  //return res.send("seq server")
                  if (error.message.includes("String or binary data would be truncated")) 
                 {
                    // Extract all column names causing the error (assuming a consistent format)
                    const columnMatches = error.message.match(/column '(.*?)'/g);
                    const columnNames = columnMatches
                      ? columnMatches.map(match => match.replace(/column '|'/g, ''))
                      : ['unknown column'];
              
                    // Create a user-friendly error message
                    const columnErrorMessages = columnNames.map(columnName => {
                      // Replace with actual code to retrieve the maxSize for this columnName
                      const maxSize =getMaxSizeForColumn(columnName)
              
                      if (maxSize) {
                        return `The data in ${columnName} is too long. Please enter data length of ${maxSize} agent name is ${data.Agent_Name},`;
                      } else {
                        return `The data in ${columnName} is too long,`; // Handle cases where maxSize is not available
                      }
                    });
                    function getMaxSizeForColumn(columnName) {
                      const char10=['IsaClient','Earned1K','Course_Access','Exam_Scheduled','Date_passed',
                      'AML_Course','License_Registered','Resident_Number',
                      'Business_Orientation','GroupME','WealthSmyth','MyWFG','E_O_Paid','Platform_Fee','Direct_Deposit','Business_Launch',
                      'Eagle_Academy','Associate_Status'];
                      const char255=['Agent_Name','Training_Associate','Upline_Agent','AMA_Date',
                      'NinetyDay_clock','Financial_Orientation']
   
                      if (char10.includes(columnName)) {
                        return 10;
                      } else if (char255.includes(columnName)) {
                        return 255;
                      } else if(z==='Agent_Agreement'){
                          return 50;
                      }else {
                        return null; 
                      }
                    }
                    resulterror.push(columnErrorMessages)
                   // return res.send(resulterror)
                    //resulterror.push(hello)
                   
              
                  }
                 
                  }
                  
*/
                
                }
              
              
                
   }
           

              
             
             else if (id && Flag==="d" && bool){
              const del=Agent.findByPk(id)

              try{
                if(del){
                await Agent.update({
                  IsActive:'N' 
                },
                {
                  where:{Agent_OnBoarding_ID:id}
                }
                )
              }
              }
              catch(err){
                resulterror.push("Error occuring in deletion,")
              }
        
            }
            else if(Flag==="i" && bool) {
              try{
                
                const Days=parseInt(data.E_O_Days, 10)
            
              
    
              const newAgent=await Agent.create({ Agent_Name: data.Agent_Name ,
                Training_Associate:data.Training_Associate,
                Upline_Agent:data.Upline_Agent,
                AMA_Date:data.AMA_Date,
                NinetyDay_clock:data.NinetyDay_clock,
                Financial_Orientation:data.Financial_Orientation,
                IsaClient:data.IsaClient,
                Earned1K:data.Earned1K,
                Course_Access:data.Course_Access,
                Exam_Scheduled:data.Exam_Scheduled,
                Date_passed:data.Date_passed,
                AML_Course:data.AML_Course,
                License_Registered:data.License_Registered,
                Resident_Number:data.Resident_Number,
                Business_Orientation:data.Business_Orientation,
                GroupME:data.GroupME,
                WealthSmyth:data.WealthSmyth,
                Agent_Agreement:data.Agent_Agreement,
                MyWFG:data.MyWFG,
                E_O_Days:data.E_O_Days,
                E_O_Paid:data.E_O_Paid,
                Platform_Fee:data.Platform_Fee,
                Direct_Deposit:data.Direct_Deposit,
                Business_Launch:data.Business_Launch,
                Eagle_Academy:data.Eagle_Academy,
                Associate_Status:data.Associate_Status
              });
            
            
              }
                  
        catch (error) {
          /*
          
          if (error.name === 'SequelizeDatabaseError') {
            // Check if the error message indicates data truncation
            if (error.message.includes("String or binary data would be truncated")) {
              // Extract all column names causing the error (assuming a consistent format)
              const columnMatches = error.message.match(/column '(.*?)'/g);
              const columnNames = columnMatches
                ? columnMatches.map(match => match.replace(/column '|'/g, ''))
                : ['unknown column'];
        
              // Create a user-friendly error message
              const columnErrorMessages = columnNames.map(columnName => {
                // Replace with actual code to retrieve the maxSize for this columnName
                const maxSize =getMaxSizeForColumn(columnName)
        
                if (maxSize) {
                  return `The data in ${columnName} is too long. Please enter the data length of ${maxSize} .The Agentname is ${data.Agent_Name},`;
                } else {
                  return `The data in ${columnName} is too long.`; // Handle cases where maxSize is not available
                }
              });
              function getMaxSizeForColumn(columnName) {
                const char10=['IsaClient','Earned1K','Course_Access','Exam_Scheduled','Date_passed',
                'AML_Course','License_Registered','Resident_Number',
                'Business_Orientation','GroupME','WealthSmyth','MyWFG','E_O_Paid','Platform_Fee','Direct_Deposit','Business_Launch',
                'Eagle_Academy','Associate_Status'];
                const char255=['Agent_Name','Training_Associate','Upline_Agent','AMA_Date',
                'NinetyDay_clock','Financial_Orientation']

                if (char10.includes(columnName)) {
                  return 10;
                } else if (char255.includes(columnName)) {
                  return 255;
                } else if(z==='Agent_Agreement'){
                    return 50;
                }else {
                  return null; 
                }
              }
              
              resulterror.push(columnErrorMessages.join(' ')+",");
        
            }*/
          
            
           

           
        
              

   }}}
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

   }}

    


module.exports =Agent_functions;
                                
