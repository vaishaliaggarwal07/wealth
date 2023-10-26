const express = require('express');

const {  getSale, getSaleById, updateSale,createSale} = require('../controller/Salecontroller')
const {  getUnder, getUnderById, updateUnder,createUnder} = require('../controller/Undercontroller')
const {  getAgent, getAgentById, updateAgent,createAgent} = require('../controller/Agentcontroller')


const router = express.Router();

router.route('/SalesCallTracker').get(getSale);
router.route('/SalesCallTracker/:id').get(getSaleById); 
router.route('/SalesCallTracker/update/:id').put(updateSale);
router.route('/SalesCallTracker/create').post(createSale);

router.route('/Agent_Underwriting').get(getUnder);
router.route('/Agent_Underwriting/:id').get(getUnderById); 
router.route('/Agent_Underwriting/update/:id').put(updateUnder);
router.route('/Agent_Underwriting/create').post(createUnder);

router.route('/Agent_OnBoarding').get(getAgent);
router.route('/Agent_OnBoarding/:id').get(getAgentById); 
router.route('/Agent_OnBoarding/update/:id').put(updateAgent);
router.route('/Agent_OnBoarding/create').post(createAgent);



module.exports = router;
