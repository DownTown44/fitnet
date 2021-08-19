import express from 'express';

import { createEvent, getEventById } from '../../database/dbHandler.js';

const router = express.Router();

const camelCaseify = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key.replace(/(\_\w)/g, (dashLatter) => {
        return dashLatter[1].toUpperCase();
      })] = obj[key];
    }
  }
  return newObj;
}

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

router.get('/:id', async (req, res) => {
  try {
    const result = await getEventById(req.params.id);
    result[0].type = result[0].type.type_name;
    res.status(200);
    res.send(camelCaseify(result[0]));
  } catch (error) {
    res.status(500);
    res.send(`${error}\nPlease try again later`);
  }
});

export default router;
