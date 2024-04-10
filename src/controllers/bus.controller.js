const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { busService } = require('../services');

const createBus = catchAsync(async (req, res) => {
  const bus = await busService.addBus(req.body);
  res.status(httpStatus.CREATED).send(bus);
});

const getBus = catchAsync(async (req, res) => {
  const bus = await busService.getBusById(req.params.busId);
  res.send(bus);
});

const getAllBuses = catchAsync(async (req, res) => {
  const buses = await busService.getAllBuses();
  res.send(buses);
});

const updateBus = catchAsync(async (req, res) => {
  const bus = await busService.updateBusById(req.params.busId, req.body);
  res.send(bus);
});

const deleteBus = catchAsync(async (req, res) => {
  const bus = await busService.deleteBusById(req.params.busId);
  res.send(bus);
});

const getBusLocation = catchAsync(async (req, res) => {

});

module.exports = {
  createBus,
  getBus,
  updateBus,
  deleteBus,
  getAllBuses,
};
