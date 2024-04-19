const { default: contentSecurityPolicy } = require('helmet/dist/middlewares/content-security-policy');
const { User, Bus } = require('../models');
const { update } = require('../models/token.model');

const getDriver = async (id) => {
  console.log('iddididid', id);

  // console.log(_id);
  // this is the id of the driver but their is null in the driverInfo
  const driverInfo = await User.findById({_id:id});
console.log('driverInfo', driverInfo);
  return driverInfo;
};

const addDriver = async (driver) => {
  driver.role = 'driver';
  return User.create(driver);
};

const getAllDrivers = async () => {
  return User.find({ role: 'driver' });
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

const updateDriver = async (driverId, driver) => {
  const driverInfo = await User.findById(driver.id);
  console.log(driver);
  driverInfo.name = driver.name;
  driverInfo.email = driver.email;
  driverInfo.phone = driver.phone;
  await driverInfo.save();

  return driverInfo;
};

module.exports = {
  updateDriver,
  getDriver,
  getDriverByBusId,
  addDriver,
  updateDriverLocation,
  getAllDrivers,
};
