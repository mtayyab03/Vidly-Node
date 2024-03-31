const mongoose = require("mongoose");
const winston = require("winston");

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

module.exports = function () {
  // MongoDB connection URL
  const mongoURL = "mongodb://localhost:27017/vidly";

  // Options to pass to MongoDB driver during connection
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  // Connect to MongoDB
  mongoose.connect(mongoURL, options).then(() => {
    logger.info("Connected to MongoDB");
  });
};
