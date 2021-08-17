import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import snakeCasify from './middleware/snakeCasify.js';
import groups from './routes/groups.js';
import signup from './routes/signup.js';
import login from './routes/login.js';
import { checkToken, decodeToken } from './middleware/jwtCheck.js';

const app = express();
const port = 8080;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(cookieParser());
app.use(decodeToken);

app.use(express.json());
app.use(morgan('tiny'));
app.use(snakeCasify);

// Make the assests directory static
app.use(express.static(path.join(process.cwd(), 'server/assets')));

app.use('/groups', groups);
app.use('/signup', signup);
app.use('/login', login);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
