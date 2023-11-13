import 'dotenv/config';
import express, { Application } from 'express';

const app: Application = express();
const PORT = process.env.PORT;

app.use(express.static('dist'));

app.listen(PORT, (): void => {
  console.log(`Frontend runs on port ${PORT}.`);
});
