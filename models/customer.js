const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
  phone: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
  isGold: Boolean,
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(3).max(50).required(),
    isGold: Joi.boolean,
  });
  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
