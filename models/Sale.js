const { Sequelize,DataTypes } = require('sequelize');
const sequelize = require('../config');

const Sale= sequelize.define('SalesCallTracker', {
    CallTracker_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // You can use auto-increment for an integer primary kSTRING(1)ey
      },
      Agent_Name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    Goal_1: {
        type: DataTypes.STRING(255),
        allowNull: true, 
    },
    Goal_lineDate: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    Secondary_Goal: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    Prospect_Name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    Prospect_Email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Prospect_Phone: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Prospect_Notes  : {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      call_1 : {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Text_1 : {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Email_1  :{
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Convo_1: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Appset_1:{
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      call_2: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Text_2  :{
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Email_2: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Convo_2 : {
        type: DataTypes.STRING(1),
        allowNull: true,
    },
    Appset_2 : {
        type: DataTypes.STRING(1),
        allowNull: true, 
    },
    call_3 : {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Text_3: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Email_3: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Convo_3: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Appset_3: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      call_4 : {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Text_4 : {
        type: DataTypes.STRING(1),
        allowNull:true,
    },
    Email_4: {
        type: DataTypes.STRING(1),
        allowNull: true, 
    },
    Convo_4: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Appset_4: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      call_5: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Text_5: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Email_5: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Convo_5: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Appset_5 : {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      call_6 : {
        type: DataTypes.STRING(1),
        allowNull: true,
    },
    Text_6: {
        type: DataTypes.STRING(1),
        allowNull: true, 
    },
    Email_6: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Convo_6 : {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Appset_6: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Field_Trainer: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Appt_Done: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      Disposition : {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Recruit: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    Referral: {
        type: DataTypes.STRING(255),
        allowNull: true, 
    },
    Points: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Earnings: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Created_by: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        //defaultValue: Sequelize.fn('GETDATE'),
    
      },
      IsConverted: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      IsActive:{
        type:DataTypes.CHAR(1),
        defaultValue:'Y',
      }
      
      
      
   
    },{
      
   
      tableName:'SalesCallTracker'
})

module.exports = Sale;
