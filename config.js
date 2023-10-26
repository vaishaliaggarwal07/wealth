// config.js
const Sequelize = require('sequelize');

/*
const sequelize = new Sequelize('project', 'root', 'Nagercoil@9488', {
  host: 'localhost',
  dialect: 'mysql', 
});
*/






const sequelize = new Sequelize({
  dialect: 'mssql',
  host: 'wealthsmyth.database.windows.net',
  username: 'Administrator_sa',
  password:'qDKLGY1T#AJnydS11DmX',
  database: 'WealthSmythDB', // Replace with your actual database name
  options: {
    encrypt: true, // Use encryption if required for your SQL Server
    trustServerCertificate: false, // Change to true if needed
  },
});







module.exports = sequelize; // Export the configured instance for use in other modules







