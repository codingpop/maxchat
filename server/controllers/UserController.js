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

          res.status(201).json({ name, email });
        }
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
}

export default UserController;
