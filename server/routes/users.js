import express from 'express';

import {
  getUsersByName,
  getEventParticipants,
  getGroupParticipants,
  getUsersGroups
} from '../../database/dbHandler.js';

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

router.get('/eventUsers', async (req, res) => {
  try {
    const eventId = req.query.eventId;

    const result = await getEventParticipants(eventId);
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

router.get('/groupUsers', async (req, res) => {
  try {
    const groupId = req.query.groupId;

    const result = await getGroupParticipants(groupId);
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
