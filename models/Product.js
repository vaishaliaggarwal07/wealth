const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Product= sequelize.define('Providers_Product', {
    Provider_Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Commission_Rate_Matrix: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    Support_Name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    Support_Phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    Product_Type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    Product: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    Commission_Rate_1: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    Effective_Date_1 : {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    Commission_Rate_2 : {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    Effective_date_2: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    Commission_Rate_3 :{
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    Effective_Date_3 : {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    Commission_Rate_4:{
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    Effective_Date_4: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    Commission_Rate5 :{
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    Effective_Date_5: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },{
      timestamps:false,
      tableName:'Providers_Product'
})

module.exports = Product;
