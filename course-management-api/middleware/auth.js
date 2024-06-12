const jwt = require('jwt-simple');
const User = require('../models/User');
const config = require('../config/config');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const token = req.headers.authorization.split(' ')[1];
  const payload = jwt.decode(token, config.secret);

  if (!payload) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  User.findById(payload.sub, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  });
};
