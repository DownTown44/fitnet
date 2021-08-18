import express from 'express';
import { getAccessibilities } from '../../database/dbHandler.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await getAccessibilities();
    result.forEach(obj => {
      delete Object.assign(obj, {['value']: obj['accessibility_id']}) ['accessibility_id'];
      delete Object.assign(obj, {['text']: obj['accessibility_name']}) ['accessibility_name'];
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({});
  }
});

export default router;
