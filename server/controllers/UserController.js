import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/User';

/**
 * @class
 */
class UserController {
  static async register(req, res) {
    try {
      req.checkBody('name', 'Invalid name').isAlpha();
      req.checkBody('email', 'Invalid Email Address').isEmail();
      req.checkBody('password', 'Password must be at least 8 characters').isLength({ min: 8 });

      const reqErrors = req.validationErrors();

      if (reqErrors) {
        res.status(400).json({
          error: reqErrors,
        });
      } else {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
          res.status(409).json({
            error: `${req.body.email} already exists`,

          });
        } else {
          const { name, email } = await User(req.body).save();

          const token = jwt.sign({ name, email }, process.env.SECRET, { expiresIn: '24h' });

          res.status(201).json({
            user: { name, email },
            token,
          });
        }
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }

  static async login(req, res) {
    try {
      const existingUser = await User.findOne({ email: req.body.email });

      if (existingUser) {
        const passwordMatches = await bcrypt.compare(req.body.password, existingUser.password);
        if (passwordMatches) {
          const { name, email } = existingUser;
          const token = jwt.sign({ name, email }, process.env.SECRET, { expiresIn: '24h' });
          res.status(200).json({
            user: { name, email },
            token,
          });
        } else {
          res.status(401).json({
            error: 'You entered a wrong password',
          });
        }
      } else {
        res.status(404).json({
          error: 'User not found',

        });
      }
    }catch (err) {

    }

  }
}

export default UserController;
