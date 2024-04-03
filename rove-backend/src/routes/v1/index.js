const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const driverRoute = require('./driver.route');
const busRoute = require('./bus.route');
const routeRoute = require('./route.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/driver',
    route: driverRoute,
  },
  {
    path: '/bus',
    route: busRoute,
  },
  {
    path: '/route',
    route: routeRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */

devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
