const httpStatus = require('http-status');
const { routeService } = require('../services');

const createRoute = async (req, res) => {
  const route = await routeService.createRoute(req.body);
  res.status(httpStatus.CREATED).send(route);
};

const getRoutes = async (req, res) => {
  const routes = await routeService.getRoutes();
  res.send(routes);
};

const getRouteById = async (req, res) => {
  const route = await routeService.getRouteById(req.params.routeId);
  res.send(route);
};

const updateRoute = async (req, res) => {
  const route = await routeService.updateRouteById(req.params.routeId, req.body);
  res.send(route);
};

const deleteRoute = async (req, res) => {
  const route = await routeService.deleteRouteById(req.params.routeId);
  res.send(route);
};

const getStoppageById = async (req, res) => {
  const stoppage = await routeService.getStoppageById(req.params.routeId, req.params.stoppageId);
  res.send(stoppage);
};

const addStoppage = async (req, res) => {
  const route = await routeService.addStoppageToRoute(req.params.routeId, req.body);
  res.send(route);
};

const removeStoppage = async (req, res) => {
  const route = await routeService.removeStoppageFromRoute(req.params.routeId, req.params.stoppageId);
  res.send(route);
};

const updateStoppage = async (req, res) => {
  const route = await routeService.updateStoppageInRoute(req.params.routeId, req.params.stoppageId, req.body);
  res.send(route);
};

const getAllStoppages = async (req, res) => {
  const stoppages = await routeService.getAllStoppages();
  res.send(stoppages);
};

module.exports = {
  getAllStoppages,
  createRoute,
  getRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
  addStoppage,
  removeStoppage,
  getStoppageById,
  updateStoppage,
};
