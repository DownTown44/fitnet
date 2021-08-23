import express from 'express';

import { getUsersByName } from '../../database/dbHandler.js';

const router = express.Router();

const userDTO = (data) => {
  const dto = {};
  const {
    user_id,
    first_name,
    last_name
  } = data;
  
  dto.userId = user_id;
  dto.firstName = first_name;
  dto.lastName = last_name;
  
  return dto;
}

router.get('/', async (req, res) => {
  try {
    const searchString = req.query.searchString;
    console.log(searchString);

    const result = await getUsersByName(searchString);
    result.forEach((element, index, array) => {
      array[index] = userDTO(element);
    });

    res.status(200);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json({});
  }
});

export default router;
