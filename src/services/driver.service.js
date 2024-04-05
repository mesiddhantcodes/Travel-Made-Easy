const { User, Bus } = require('../models');

const getDriver = async (id) => {
  return User.findById(id);
};

const addDriver = async (driver) => {
  driver.role = 'driver';
  return User.create(driver);
};

const getDriverByBusId = async (busId) => {
  const bus = await Bus.findOne({ bus: busId });
  const driver = await User.findById(bus.driver);
  return driver;
};

const updateDriverLocation = async (driverId, location) => {
  const driver = await User.findById(driverId);
  driver.location = location;
  await driver.save();
  return driver;
};

module.exports = {
  getDriver,
  getDriverByBusId,
  addDriver,
  updateDriverLocation,
};
