const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const FiscalCalendar = sequelize.define('Fiscal_Calendar', {
    Calendar_Date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    Day_Num: {
        type: DataTypes.INTEGER,
        allowNull: true, 
    },
    Week_Num: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Month_Num: {
        type: DataTypes.INTEGER,
        allowNull: true, 
    },
    Quarter_Num: {
        type: DataTypes.INTEGER,
        allowNull:  true,
      },
    Month_Name: {
        type: DataTypes.STRING,
        allowNull:  true,
      },
    Year: {
        type: DataTypes.INTEGER,
        allowNull:  true,
      },
    Month_Year: {
        type: DataTypes.STRING,
        allowNull:  true,
      },
    Quarter_Year: {
        type: DataTypes.STRING,
        allowNull:  true,
      },
    Pay_Cycle : {
        type: DataTypes.STRING,
        allowNull:  true,
      },
    Fiscal_Month : {
        type: DataTypes.STRING,
        allowNull:  true,
      },
    Fiscal_Quarter : {
        type: DataTypes.STRING,
        allowNull:  true,
      },
    Fiscal_Year  : {
        type: DataTypes.INTEGER,
        allowNull:  true,
      },
    HI_Qual_Period: {
        type: DataTypes.STRING,
        allowNull:  true,
      },
    NLA_GA_Qual_Period  : {
        type: DataTypes.STRING,
        allowNull:  true,
      },
    Tiger_Qual_Period  : {
        type: DataTypes.STRING,
        allowNull:  true,
      },
    },{
      timestamps:false,
      tableName:'Fiscal_Calendar'

    
})

module.exports = FiscalCalendar;

