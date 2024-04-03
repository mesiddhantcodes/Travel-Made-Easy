const express = require('express');
const validate = require('../../middlewares/validate');
const busController = require('../../controllers/bus.controller');

const router = express.Router();

router.route('/').post(busController.createBus);

router
  .route('/:busId')
  .get(busController.getBus)
  .patch( busController.updateBus)
  .delete( busController.deleteBus);

module.exports = router;
