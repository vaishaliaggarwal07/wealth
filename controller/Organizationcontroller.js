const Organization = require('../models/Organization');
const {User,Role} = require('../models/user');
const bodyParser = require('body-parser');
const sequelize = require('../config');


const organization_functions = {
    createOrganization: async (req, res) => {
        try {
            const {
                AssociateID, BaseShopID, UplineID, FirstName, LastName, NameTitle, TitleLevel, Downline, LicenseDate,
                ADate, SADate, MDDate, SMDDate, Inactivedate, HomeStreet1, HomeCity, HomeState, HomePostal, Country,
                LLFlag, WorkEmail, Mobile, Country_2, HomeStreet2
            } = req.body;

            // Create a new organization
            const newOrganization = await Organization.create({
                AssociateID,
                BaseShopID,
                UplineID,
                FirstName,
                LastName,
                NameTitle,
                TitleLevel,
                Downline,
                LicenseDate,
                ADate,
                SADate,
                MDDate,
                SMDDate,
                Inactivedate,
                HomeStreet1,
                HomeCity,
                HomeState,
                HomePostal,
                Country,
                LLFlag,
                WorkEmail,
                Mobile,
                Country_2,
                HomeStreet2,
            });

            const response = {
                success: true,
                message: 'Organization created successfully',
                data: newOrganization,
            };

            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: error.message + ' An error occurred while creating the organization' });
        }
    },

    getuserorganization:async (req, res) =>{
        try{
            const userId = req.params.id;
            const user = await User.findByPk(userId);
            const organization = await Organization.findAll({
                where: {
                  BaseShopID: user.BaseShopID, // Replace 'yourCondition' with your actual condition
                },
              });
              if (organization) {
                
                res.status(200).json(organization);
            } else {
                res.status(404).json( {message: 'No Organization exist' });
            }
        }
        catch (error) {
            console.error('Error finding Organization:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },
    
            

    getOrganization: async (req, res) => {
        try {
            const allOrganization = await Organization.findAll();
           
            if (allOrganization) {
                
                res.status(200).json(allOrganization);
            } else {
                res.status(404).json( {message: 'No Organization exist' });
            }
        } catch (error) {
            console.error('Error finding Organization:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    updateOrganization: async (req, res) => {
        try {
            const organizationId = req.params.id;
            const {
                AssociateID,BaseShopID,UplineID,FirstName,LastName,NameTitle,TitleLevel,Downline,LicenseDate,ADate,SADate,MDDate,
                SMDDate,Inactivedate,HomeStreet1,HomeCity,HomeState,HomePostal,Country,LLFlag,WorkEmail,Mobile,Country_2,HomeStreet2
               
            } = req.body;

            // Find the client by ID
            const existingOrganization = await Organization.findByPk(organizationId);

            if (!existingOrganization) {
                return res.status(404).json({ success: false, message: 'Organization not found' });
            }

            // Update the client's information
            await existingOrganization.update({
                AssociateID,BaseShopID,UplineID,FirstName,LastName,NameTitle,TitleLevel,Downline,LicenseDate,ADate,SADate,MDDate,
                SMDDate,Inactivedate,HomeStreet1,HomeCity,HomeState,HomePostal,Country,LLFlag,WorkEmail,Mobile,Country_2,HomeStreet2
              
            });
            
            const response = {
                success: true,
                message: 'Organization updated successfully',
                data: existingOrganization
            };
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: error.message+ 'An error occurred while updating the Organization' });
        }
    },

    
       
    getOrganizationById:async (req, res) => {
        try {
            const organizationId = req.params.id; 
            const organization = await Organization.findByPk(organizationId);
            if (!organization) {
                return res.status(404).json({ success: false, message: 'Organization not found' });
            }
                
            res.json(organization);
        } catch (error) {
            console.error('Error finding or Organization by ID:', error);
            res.status(500).json({ success: false, message: 'An error occurred while finding Organization by ID' });
        }
    }

};

module.exports = organization_functions;
