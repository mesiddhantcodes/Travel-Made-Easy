const express = require('express');
const validate = require('../../middlewares/validate');
const busController = require('../../controllers/bus.controller');

const router = express.Router();

router
    .route('/')
    .post(busController.createBus)
    .get(busController.getAllBuses); 

router
  .route('/:busId')
  .get(busController.getBus)
  .put( busController.updateBus)
  .delete( busController.deleteBus);


module.exports = router;
