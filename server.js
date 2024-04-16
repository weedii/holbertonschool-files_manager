import express from 'express';
import router from './routes';

const app = express();

app.use('/', router);

app.listen(process.env.port || 5000, () => {
  console.log(`Server running on port ${PORT}`);
});
