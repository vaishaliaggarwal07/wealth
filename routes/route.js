const express = require('express');
const { createOrganization, getuserorganization,getOrganization, getOrganizationById, updateOrganization} = require('../controller/Organizationcontroller')
const {  getCommision, getCommisionById, updateCommision} = require('../controller/Commisioncontroller')
const {  getGoal, getGoalById, updateGoal} = require('../controller/Goalcontroller')
const {  getProduct, getProductById, updateProduct} = require('../controller/Productcontroller')
const {  getFiscal, getFiscalById, updateFiscal} = require('../controller/Fiscalcontroller')
const {  getUser, getUserById, updateUser,deleteUser} = require('../controller/Usercontroller')


const router = express.Router();




router.route('/Organization/create').post(createOrganization);

router.route('/Organization').get(getOrganization);
router.route('/Organization/:id').get(getOrganizationById); // Use .get() for fetching by ID
router.route('/Organization/update/:id').put(updateOrganization);
router.route('/getuserorganization/:id').get(getuserorganization);



router.route('/Commision').get(getCommision);
router.route('/Commision/:id').get(getCommisionById); // Use .get() for fetching by ID
router.route('/Commision/update/:id').put(updateCommision);


router.route('/Product').get(getProduct);
router.route('/Product/:id').get(getProductById); // Use .get() for fetching by ID
router.route('/Product/update/:id').put(updateProduct);

router.route('/Fiscal').get(getFiscal);
router.route('/Fiscal/:id').get(getFiscalById); // Use .get() for fetching by ID
router.route('/Fiscal/update/:id').put(updateFiscal);


router.route('/Goal').get(getGoal);
router.route('/Goal/:id').get(getGoalById); // Use .get() for fetching by ID
router.route('/Goal/update/:id').put(updateGoal);


router.route('/User').get(getUser);
router.route('/User/:id').get(getUserById); // Use .get() for fetching by ID
router.route('/User/update/:id').put(updateUser);
router.route('/User/delete/:id').delete(deleteUser);





module.exports = router;
