import express from 'express';

import { createEvent } from '../../database/dbHandler.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;
  try {
    // Inserting into database
    await createEvent(data);

    res.status(201);
    res.json({created: true});
  } catch (error) {
    res.status(400);
    res.json({created: false, message: `${error}\nPlease try again later`});
  }
});

export default router;
