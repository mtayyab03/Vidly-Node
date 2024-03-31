const winston = require("winston");
const express = require("express");
const config = require("config");
const app = express();

require("./startups/logging");
require("./startups/routes")(app);
require("./startups/db")();

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL error: jwtPrivateKey is not defined");
  }
};

const PORT = process.env.PORT || 3000;

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

module.exports = server;
