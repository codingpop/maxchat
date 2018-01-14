import jwt from 'jsonwebtoken';

import User from '../models/User';

const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (token) {
      const payload = await jwt.verify(token, process.env.SECRET);

      const user = await User.findOne({ email: payload.email });

      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({
          error: 'User does not exist',
        });
      }
    } else {
      res.status(401).json({
        error: 'You are not logged in',
      });
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(400).json({
        error: 'Token has expired',
      });
    } else if (error.name === 'JsonWebTokenError') {
      res.status(400).json({
        error: 'Invalid token',
      });
    } else {
      res.sendStatus(500);
    }
  }
};

export default verifyToken;
