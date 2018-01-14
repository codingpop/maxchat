import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  name: String,
  message: String,
});

export default mongoose.model('Chat', chatSchema);
