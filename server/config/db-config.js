import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.Promise = global.Promise;

export default mongoose.connect(process.env.MONGO_URL);

