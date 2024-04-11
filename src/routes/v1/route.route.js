const express = require('express');
const routeController = require('../../controllers/route.controller');

const router = express.Router();

router.route('/').post(routeController.createRoute).get(routeController.getRoutes);
router.route('/stoppages').get(routeController.getAllStoppages);
router
  .route('/:routeId')
  .get(routeController.getRouteById)
  .patch(routeController.updateRoute)
  .delete(routeController.deleteRoute);

router
  .route('/:routeId/stoppage/:stoppageId')
  .get(routeController.getStoppageById)
  .patch(routeController.updateStoppage)
  .delete(routeController.removeStoppage);

router.route('/:routeId/stoppage').post(routeController.addStoppage);



module.exports = router;
