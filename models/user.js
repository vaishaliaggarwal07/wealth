const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config');

const User = sequelize.define('users', {
  roleid: {
    type: DataTypes.INTEGER,
    defaultValue: 2, // Set the default value as a plain value
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'unique_email',
      msg: 'email must be unique.',
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, 
},
First_name: {
  type: DataTypes.STRING,
  allowNull: true, 
},
Last_name: {
  type: DataTypes.STRING,
  allowNull: true, 
},
BaseShopID: {
    type: DataTypes.STRING,
    allowNull: true,
  },
Mobileno: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},{
  timestamps:false
})
  // ... other fields


const Role = sequelize.define('roles', {
  
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false
});

User.belongsTo(Role, {
  foreignKey: 'roleid',
  
});



module.exports = { User, Role };
