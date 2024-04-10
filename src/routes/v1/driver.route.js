const express = require('express');
const auth = require('../../middlewares/auth');
const { driverController } = require('../../controllers');

const router = express.Router();

router.route('/bus/:id').get(auth('getBus'), driverController.getDriverByBusId);
router.route('/').post(driverController.createDriver);
router.route('/').get(driverController.getAllDrivers);
router.route('/location').patch(auth('updateDriverLocation'), driverController.updateDriverLocation);
module.exports = router;
