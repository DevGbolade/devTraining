import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { cloudinaryConfig } from './api/middlewares/multerCloudinaryMiddleware';
import userRoute from './api/routes/userRoute';
import gifRoute from './api/routes/gifRoute';
import articleRoute from './api/routes/articleRoute';

const app = express();
const API_VERSION = '/api/v1';

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cloudinaryConfig);
app.use(`${API_VERSION}`, userRoute);
app.use(`${API_VERSION}`, gifRoute);
app.use(`${API_VERSION}`, articleRoute);
// app.use(`${API_VERSION}`);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Wayfarer Api' });
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: "Sorry, we couldn't find that!"
  });
});

app.use((err, req, res, next) => {
  if (!err) return next();
  return res.status(400).json({
    status: 400,
    error: `Failed to decode param: ${req.url}`
  });
});

export default app;
