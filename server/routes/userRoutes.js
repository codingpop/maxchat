import UserController from '../controllers/UserController';

const userRoute = (version, app) => {
  app.post(`${version}/users/register`, UserController.register);
  app.post(`${version}/users/login`, UserController.login);
};

export default userRoute;
