const express = require("express");
const error = require("../middleware/error");
const genres = require("../routes/genres");
const customer = require("../routes/customers");
const users = require("../routes/users");
const auth = require("../routes/auth");

module.exports = function (app) {
  app.use(express.json()); //for middleware
  app.use("/api/geners", genres);
  app.use("/api/customer", customer);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
