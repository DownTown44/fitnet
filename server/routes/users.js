import express from 'express';

import {
  getUsersByName,
  getEventParticipants,
  getGroupParticipants,
  userIsMemberOfGroup
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

router.get('/member', async (req, res) => {
  try {
    const data = req.query;
    const result = await userIsMemberOfGroup(data);

    if (result.length) {
      res.status(200);
      res.json({
        isMember: true,
        message: 'The user is member of the group'
      })
    } else {
      res.status(200);
      res.json({
        isMember: false,
        message: 'The user is NOT member of the group'
      })
    }
  } catch (error) {
    console.log(error);

    res.status(403);
    res.json({
      message: 'Please log in'
    })
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
  } catch {
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
  } catch {
    res.status(400);
    res.json({});
  }
});


export default router;
