import express from 'express';
import morgan from 'morgan';
import path from 'path';

import groups from './routes/groups.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(morgan('tiny'));

// Make the assests directory static
app.use(express.static(path.join(process.cwd(), 'server/assets')));

app.use('/groups', groups);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
