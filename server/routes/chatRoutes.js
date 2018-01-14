import ChatController from '../controllers/ChatController';
import verifyToken from '../middleware/verifyToken';

const chatRoutes = (version, app) => {
  app.post(`${version}/users/chat/messages`, verifyToken, ChatController.postMessage);
  app.get(`${version}/users/chat/messages`, verifyToken, ChatController.getMessages);
};

export default chatRoutes;
