const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { driverService } = require('../services');

const createDriver = catchAsync(async (req, res) => {
  const driver = await driverService.createDriver(req.body);

  res.status(httpStatus.CREATED).send(driver);
});

const getDriver = catchAsync(async (req, res) => {
  const driver = await driverService.getDriver(req.params.driverId);
  res.send(driver);
});

const getAllDrivers = catchAsync(async (req, res) => {
  const drivers = await driverService.getAllDrivers();
  res.send(drivers);
});

const getDriverByBusId = catchAsync(async (req, res) => {
  const driver = await driverService.getDriverByBusId(req.params.busId);
  res.send(driver);
});

const updateDriverLocation = catchAsync(async (req, res) => {
  const driver = await driverService.updateDriverLocation(req.params.driverId, req.body.location);
  res.send(driver);
});

module.exports = {
  createDriver,
  getDriverByBusId,
  getDriver,
  updateDriverLocation,
  getAllDrivers,
};
