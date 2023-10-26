const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const CommissionRate = sequelize.define('Commission_Rates', {
    Commission_Rate_ID: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Level: {
        type: DataTypes.INTEGER,
        allowNull: true, 
    },
    Level_Abbr: {
        type: DataTypes.STRING,
        allowNull:  true,
      },
    Level_Description: {
        type: DataTypes.STRING,
        allowNull:  true,
      },
    Contract_Rate_Matrix: {
        type: DataTypes.STRING,
        allowNull:  true,
      },
    Contract_Rate: {
        type: DataTypes.FLOAT,
        allowNull:  true,
      },
    Contract_Level: {
        type: DataTypes.STRING,
        allowNull:  true,
      },
    T_Override_Rate : {
        type: DataTypes.FLOAT,
        allowNull:  true,
      },
    TA_Override_Rate : {
        type: DataTypes.FLOAT,
        allowNull:  true,
      },
    A_Override_Rate : {
        type: DataTypes.FLOAT,
        allowNull:  true,
      },
    SA_Override_Rate : {
        type: DataTypes.FLOAT,
        allowNull:  true,
      },
    MD_Override_Rate : {
        type: DataTypes.FLOAT,
        allowNull:  true,
      },
    SMD_Override_Rate : {
        type: DataTypes.FLOAT,
        allowNull:  true,
      },
    },{
      
        timestamps:false
      }

);

module.exports = CommissionRate;