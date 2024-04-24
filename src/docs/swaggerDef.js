const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Rove-TRAVEL MADE EASY',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/mesiddhantcodes/Travel-Made-Easy',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
