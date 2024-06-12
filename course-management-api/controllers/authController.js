const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const User = require('../models/User');
const config = require('../config/config');

exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword,
    role,
  });

  try {
    await user.save();
    const payload = { sub: user._id };
    const token = jwt.encode(payload, config.secret);
    res.status(201).send({ token });
  } catch (err) {
    res.status(500).send({ message: 'Error registering user' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).send({ message: 'Invalid username or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).send({ message: 'Invalid username or password' });
  }

  const payload = { sub: user._id };
  const token = jwt.encode(payload, config.secret);
  res.send({ token });
};
