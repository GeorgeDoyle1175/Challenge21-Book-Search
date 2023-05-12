const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new AuthenticationError('Invalid token');
  }
};

const signToken = (user) => {
  const payload = { id: user._id };
  const options = { expiresIn: '1d' };
  return jwt.sign(payload, secret, options);
};

const authMiddleware = ({ req }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split('Bearer ')[1];
  }

  if (!token) {
    return req;
  }

  try {
    const { id } = verifyToken(token);
    req.user = id;
  } catch (error) {
    throw new AuthenticationError('Invalid token');
  }

  return req;
};

module.exports = { authMiddleware, signToken };
