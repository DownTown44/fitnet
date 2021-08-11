import express from 'express';
import morgan from 'morgan';

import groups from './routes/groups.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(morgan('tiny'));

app.use('/groups', groups);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
