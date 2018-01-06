import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

import userRoutes from '../server/routes/userRoutes';

import './config/db-config';

const app = express();
app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true }));

userRoutes('/api/v1', app);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'You are welcome',
  });
});

app.listen(process.env.PORT);
