import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import router from '@/router';

const app: Application = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

app.use('/', router);

app.listen(PORT, (): void => {
  console.log(`Connected successfully on port ${PORT}.`);
});
