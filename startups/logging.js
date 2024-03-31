require("express-async-errors"); //for try catch
const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  //sync
  process.on("uncaughtException", (ex) => {
    console.log("We GOT UNCAUGHT EXCEPTION");
    winston.error(ex.message, ex);
  });

  // async
  process.on("unhandledRejection", (ex) => {
    console.log("We GOT UNHANDLED REJECTION");
    winston.error(ex.message, ex);
  });

  // Configuring Winston logger
  const logConfiguration = {
    transports: [new winston.transports.File({ filename: "logfile.log" })],
  };

  winston.createLogger(logConfiguration);

  //   mongodb Error
  winston.add(new winston.transports.MongoDB(), {
    db: "mongodb://localhost:27017/vidly",
    options: {
      useNewUrlParser: true, // MongoDB connection options
      useUnifiedTopology: true, // MongoDB connection options
    },
    collection: "logs", // Collection name to store logs (optional)
    level: "info", // Log level (optional)
  });

  // Log a message
  winston.info("This is a test log message to MongoDB");
};
