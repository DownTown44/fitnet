import express from 'express';

import { createEvent } from '../../database/dbHandler.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;
  try {
    // Inserting into database
    await createEvent(data);

    res.status(201);
    res.send();
  } catch (error) {
    res.status(400);
    res.send(`${error}\nPlease try again later`);
  }
});

export default router;
