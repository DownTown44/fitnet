import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

import snakeCasify from './middleware/snakeCasify.js';
import groups from './routes/groups.js';
import signup from './routes/signup.js';

const app = express();
const port = 8080;

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use(morgan('tiny'));
app.use(snakeCasify);

// Make the assests directory static
app.use(express.static(path.join(process.cwd(), 'server/assets')));

app.use('/groups', groups);
app.use('/signup', signup);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
