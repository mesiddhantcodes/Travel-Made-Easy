const { Route } = require('../models');

const { v4: uuidv4 } = require('uuid');

const createRoute = async (route) => {
  return Route.create(route);
};

const getRoutes = async () => {
  return Route.find();
};

const getRouteById = async (id) => {
  return Route.findById(id);
};

const updateRouteById = async (id, updateBody) => {
  const route = await getRouteById(id);
  if (!route) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Route not found');
  }
  Object.assign(route, updateBody);
  await route.save();
  return route;
};

const deleteRouteById = async (id) => {
  const route = await getRouteById(id);
  if (!route) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Route not found');
  }
  await route.remove();
  return route;
};

const addStoppageToRoute = async (routeId, stoppageObj) => {
  const route = await getRouteById(routeId);
  let stoppageId = uuidv4();
  stoppageObj.id = stoppageId;
  route.stoppages.push(stoppageObj);
  await route.save();
  return route;
};

const removeStoppageFromRoute = async (routeId, stoppageId) => {
  const route = await getRouteById(routeId);
  route.stoppages = route.stoppages.filter((stoppage) => stoppage.id !== stoppageId);
  await route.save();
  return route;
};

const updateStoppageInRoute = async (routeId, stoppageId, updateBody) => {
  const route = await getRouteById(routeId);
  const stoppage = route.stoppages.find((stoppage) => stoppage.id === stoppageId);
  if (!stoppage) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stoppage not found');
  }
  Object.assign(stoppage, updateBody);
  await route.save();
  return route;
};



const getStoppageById = async (routeId, stoppageId) => {
  const route = await getRouteById(routeId);
  const stoppage = route.stoppages.find((stoppage) => stoppage.id === stoppageId);
  if (!stoppage) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stoppage not found');
  }
  return stoppage;
};


const getAllStoppages = async () => {
  let routes = await Route.find();
  // here the id is created by mongoose so we need to remove it
  let stoppages = routes.map(route => route.stoppages);
  return stoppages.flat();

  // let stoppages = routes.map(route => route.stoppages);
  // return stoppages.flat();
  
  // let stoppages = [];
  // routes.forEach(route => {
  //   stoppages.push(...route.stoppages);
  // });
  // return stoppages;

}




module.exports = {
  createRoute,
  getRoutes,
  getRouteById,
  getAllStoppages,
  getStoppageById,
  updateRouteById,
  deleteRouteById,
  addStoppageToRoute,
  removeStoppageFromRoute,
  updateStoppageInRoute,
};
