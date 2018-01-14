import Chat from '../models/Chat';

class ChatController {
  static async postMessage(req, res) {
    const { message } = req.body;
    const { name } = req.user;

    if (!message) {
      res.status(400).json({
        error: 'Message cannot be empty',
      });
    } else {
      await Chat({ name, message }).save();

      res.status(200).json({
        name, message,
      });
    }
  }
  static async getMessages(req, res) {
    const messages = await Chat.find({});

    res.status(200).json({
      messages,
    });
  }
}

export default ChatController;
