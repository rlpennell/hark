const { body } = require('express-validator');
const User = require('../models/user');

const newUserValidation = [
  body('name', 'Name is required').escape().trim().isLength(1),
  body('email', 'A valid email is required')
    .escape()
    .trim()
    .toLowerCase()
    .isEmail()
    .custom(async email => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error('Email is already in use');
    }),
  body('password', 'Password is required').trim().escape(),
  body('passwordConfirm')
    .trim()
    .escape()
    .custom(async (passwordConfirm, { req }) => {
      if (passwordConfirm !== req.body.password)
        throw new Error('Passwords must match.');
    }),
];

module.exports = newUserValidation;
