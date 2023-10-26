const { Sequelize,DataTypes } = require('sequelize');
const sequelize = require('../config');

const Under= sequelize.define('Agent_Underwriting', {
    Underwriting_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        // You can use auto-increment for an integer primary kSTRING(1)ey
      },
      ClientInformation_Owner: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    Insured: {
        type: DataTypes.STRING(255),
        allowNull: true, 
    },
    Recruit_Client: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Client_State : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Application_Status: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Date_Submitted: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Pay_Cycle: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Notes : {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      Policy_No : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Policy_Provider: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Product:{
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Paramed: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Issue_Date:{
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Renewal_Date: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Target_Premium:{
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Commission_Rate: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Split_Sale: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    Gross_Points: {
        type: DataTypes.STRING(255),
        allowNull: true, 
    },
    Net_Points: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      WritingAgent_Name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      WritingAgent_Contract_Level: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      WritingAgent_Split: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      WritingAgent_Net_Points_Allocation: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      WritingAgent_Commission: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      SplitAgent1_Name_1: {
        type: DataTypes.STRING(255),
        allowNull:true,
    },
    SplitAgent1_Contract_Level: {
        type: DataTypes.STRING(255),
        allowNull: true, 
    },
    SplitAgent1_Split: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      SplitAgent1_Net_Points_Allocation : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      SplitAgent1_Commission: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      SplitAgent2_Name_2: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      SplitAgent2_Contract_Level: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      SplitAgent2_Split: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      SplitAgent2_Net_Points_Allocation : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      SplitAgent2_Commission : {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    Level_1 : {
        type: DataTypes.STRING(255),
        allowNull: true, 
    },
    Associate_Overrides_to_1: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Associate_Overrides_to_2 : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Overrides_1: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Overrides_2 : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      MD_Overrides_1 : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      MD_Overrides_2  : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      SMD_Overrides_1: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    SMD_Overrides_2: {
        type: DataTypes.STRING(255),
        allowNull: true, 
    },
    Total_Overrides_1: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Total_Overrides_2: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Level_2: {
        type: DataTypes.STRING(255),
        allowNull: true,
        //defaultValue: Sequelize.fn('GETDATE'),
    
      },
      Associate_Overrides_to_3 : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Associate_Overrides_to_4: {
        type: DataTypes.STRING(255),
        allowNull: true, 
    },
    Overrides_3: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Overrides_4 : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      MD_Overrides_3 : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      MD_Overrides_4: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      SMD_Overrides_3: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      SMD_Overrides_4 : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Total_Overrides_3 : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Total_Overrides_4 : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Level_3 :{
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Associate_Overrides_to_5: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Associate_Overrides_to_6: {
        type: DataTypes.STRING(255),
        allowNull: true, 
    },
    Overrides_5: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Overrides_6: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      MD_Overrides_5: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      MD_Overrides_6 : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      SMD_Overrides_5: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      SMD_Overrides_6  : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Total_Overrides_5: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Total_Overrides_6 : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      IsActive:{
        type:DataTypes.CHAR(1),
        defaultValue:'Y',
      }
     
      
      
   
    },{
   
      tableName:'Agent_Underwriting'
})

module.exports = Under;
