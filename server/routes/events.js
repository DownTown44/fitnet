import express from 'express';

import { createEvent, getEverythingOf } from '../../database/dbHandler.js';

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

router.get('/', async (req, res) => {
  try {
    const result = await getEverythingOf('events');
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({});
  }
});

export default router;
