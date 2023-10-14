const mongoose = require('mongoose');
4
const getDatabase =mongoose.connect("mongodb://0.0.0.0:27017/rove").then(() => {
    console.log("Database connected");
  });
module.exports = getDatabase;