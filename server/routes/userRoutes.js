import UserController from '../controllers/UserController';

const userRoute = (version, app) => {
  app.post(`${version}/users/register`, UserController.register);
};

export default userRoute;
