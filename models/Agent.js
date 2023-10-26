const { Sequelize,DataTypes } = require('sequelize');
const sequelize = require('../config');

const Agent= sequelize.define('Agent_OnBoarding', {
  Agent_OnBoarding_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

      Agent_Name: {
        type: DataTypes.STRING(255),
        allowNull: true, 
    },
    Training_Associate: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Upline_Agent : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      AMA_Date : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      NinetyDay_clock: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Financial_Orientation: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      IsaClient : {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      Earned1K  : {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      Course_Access : {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      Exam_Scheduled :{
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      
      Date_passed: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      AML_Course  :{
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      License_Registered:{
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      Resident_Number: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      Business_Orientation :{
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      GroupME: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      WealthSmyth: {
        type: DataTypes.STRING(10),
        allowNull: true, 
    },
    Agent_Agreement: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      MyWFG: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      E_O_Days : {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      E_O_Paid: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      Platform_Fee: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
     
      Direct_Deposit: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      Business_Launch: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      Eagle_Academy   : {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      Associate_Status: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      IsActive:{
        type:DataTypes.CHAR(1),
        defaultValue:'Y',
      }
      
      
     
    },{
    
      tableName:'Agent_OnBoarding',
})

module.exports = Agent;
