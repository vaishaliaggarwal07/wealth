const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Goal= sequelize.define('Goal_Type', {
    Goal_Type: {
        type: DataTypes.STRING,
        allowNull:true,
      
      },  
    Goal_Category : {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    Cohort: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    Start_Date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    Rolling_Target_End_Date : {
        type: DataTypes.STRING,
        allowNull: true,
      },
    _3Month_Rolling_Target_End_Date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    _6Month_Rolling_Target_End_Date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    _12Month_Rolling_End_Date : {
        type: DataTypes.STRING,
        allowNull: true,
      },
    Contest_End_Date : {
        type: DataTypes.STRING,
        allowNull: true,
      },
    Personal_Life_License_Target : {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    Personal_Health_License_Target :{
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    Personal_Recruits_Target: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    Personal_Apps_Target :{
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    Personal_Points_Target : {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    Personal_Field_Training_Appointments :{
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    Base_New_Recruits_Target: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    Base_Life_Licensed_Agents_Target : {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    Base_Direct_Agents_Target: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
     
    Base_Sr_Direct_Agents_Target: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    Base_Apps_Target : {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    Base_Points_Target: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    Base_to_1st_Gen_New_Recruits_Target : {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    Base_to_1st_Gen_Net_Recruits_Target: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    Base_to_1st_Gen_SMDs_Target: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    Base_to_1st_Gen_Net_Points_Target_6_months :{
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    Base_to_1st_Gen_Net_Points_Target_12_months : {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    Cash_Flow_3_Month_Target:{
        type: DataTypes.STRING,
        allowNull: true,
      },
    Cash_Flow_6_Month_Target: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    Cash_Flow_12_Month_Target :{
        type: DataTypes.STRING,
        allowNull: true,
      },
    Cash_Flow_Growth_Target : {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },{
      timestamps:false,
      tableName:'Goal_Type'
     
})

module.exports = Goal;
