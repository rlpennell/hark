const { validationResult } = require('express-validator');
const User = require('../models/user');

const handleUserInput = async (req, res, next) => {
  const { firstName, lastName, email, password, role, image } = req.body;
  const { role: currentUserRole, _id } = req.user;

  const errors = validationResult(req);

  const userFields = {
    firstName,
    lastName,
    email,
    password,
    role,
    image,
  };

  const createNewUser = () => {
    new User(userFields).save((err, newUser) => {
      if (err) return next(err);

      res.json(newUser);
    });
  };

  const updateUser = () => {
    Object.keys(userFields).forEach(key =>
      userFields[key] === '' ? delete userFields[key] : {}
    );

    if (currentUserRole !== 'admin' && _id.toString() !== req.params.userid) {
      return res
        .status(401)
        .send({ message: 'Users may only edit their own profile' });
    }
    User.findByIdAndUpdate(req.params.userid, userFields, { new: true })
      .select('_id name email role image')
      .exec((err, updatedUser) => {
        if (err) return next(err);
        res.json(updatedUser);
      });
  };

  if (!errors.isEmpty()) {
    res.status(422).send({
      errors: errors.array(),
      fields: { firstName, lastName, email, password, role, image },
    });
  } else {
    req.method == 'POST' ? createNewUser() : updateUser();
  }
};

module.exports = handleUserInput;
