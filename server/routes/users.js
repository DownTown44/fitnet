import express from 'express';

import {
  getUsersByName,
  getUsersGroups
} from '../../database/dbHandler.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const searchString = req.query.searchString;

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

router.get('/:id/groups', async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await getUsersGroups(userId);
    let resultList = [];

    for (const element of result) {
      resultList.push(element.group_id);
    }

    res.status(200);
    res.json(resultList);
  } catch (error) {
    res.status(400);
    res.json({});
  }
});

export default router;
