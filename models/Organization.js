// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config');


const Organization = sequelize.define("organizations", {
    // email,action,created_by,Modified_by,Modified_date,is_active
    AssociateID: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    BaseShopID: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    UplineID: {
        type: DataTypes.STRING,
        allowNull: true,
    }, 
    FirstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    NameTitle: {
        type: DataTypes.STRING,
        allowNull:true,
    },
    TitleLevel: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Downline: {
        type: DataTypes.INTEGER,
        allowNull: true,
    
    },LicenseDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    ADate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    SADate:{
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    MDDate:{
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    SMDDate:{
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    Inactivedate:{
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    HomeStreet1: {
        type: DataTypes.STRING,
        allowNull: true,
    },
   
    HomeCity: {
        type: DataTypes.STRING,
        allowNull:true,
    },
    HomeState: {
        type: DataTypes.STRING,
        allowNull:true,
    },
    HomePostal	:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LLFlag: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    WorkEmail:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    Mobile:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    Country_2:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    HomeStreet2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},{
    timestamps:false
    }
 
)

module.exports = Organization;
