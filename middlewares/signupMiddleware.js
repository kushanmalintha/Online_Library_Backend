const Joi = require('joi');

const username = Joi.string().alphanum().min(3).required();
const password = Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$!%*?&])[A-Za-z\\d@#$!%*?&]{8,}$'))
    .required();
const email = Joi.string().email().required();
const phone_no = Joi.string().pattern(/^\d{10}$/).required();
const membership_date = Joi.string().pattern(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/).required();

const signupDetails= Joi.object({
    username,
    password,
    email,
    phone_no,
    membership_date
});

module.exports = { signupDetails };