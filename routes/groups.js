import express from 'express';
import seq from 'sequelize';
import { createGroups } from '../database/dbHandler.js';

const { Sequelize } = seq;
const router = express.Router();

// TODO: Image upload needed

router.post('/', async (req, res) => {
  try {
    const result = await createGroups(req.body);

    res.status(200);
    res.send(JSON.stringify(result));
  } catch (error) {
    console.log(error);

    res.status(500);
    res.send(`${error}\nPlease try again later`);
  }
});

export default router;
